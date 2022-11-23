import { useRef, useState } from "react";
import { DIGITS, OPERATORS, SPECIAL } from "@/constants/calculator";
import { useEventListener } from "usehooks-ts";
import { CalculatorButtons } from "@/components/CalculatorButtons";
import { Display } from "@/components/Display";
import { History } from "@/types/calculator";
import FocusTrap from "focus-trap-react";

export const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [isHistoryOpened, setIsHistoryOpened] = useState(false);
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const openHistoryButtonRef = useRef<HTMLDivElement>(null);
  const shouldIgnoreKeyboardEvents = [
    historyContainerRef,
    openHistoryButtonRef,
  ].some((elementRef) => {
    return elementRef.current?.contains(document.activeElement);
  });

  useEventListener("keyup", () => {
    setPressedKeys([]);
  });

  useEventListener("keydown", (e) => {
    if (!(e instanceof KeyboardEvent) || shouldIgnoreKeyboardEvents) return;
    let pressedKey = e.key;
    const replace: Record<string, string> = {
      Backspace: "DEL",
      Enter: "=",
      c: "AC",
      ",": ".",
    };
    if (pressedKey in replace) {
      pressedKey = replace[pressedKey];
    }
    setPressedKeys((prevKeys) => [...prevKeys, pressedKey]);
    handleCalculatorButtonClick(pressedKey);
  });

  const calculate = () => {
    let answer: string | null = null;
    switch (operator) {
      case "+": {
        answer = String(Number(firstNumber) + Number(secondNumber));
        break;
      }
      case "-": {
        answer = String(Number(firstNumber) - Number(secondNumber));
        break;
      }
      case "/": {
        answer = String(Number(firstNumber) / Number(secondNumber));
        break;
      }
      case "*": {
        answer = String(Number(firstNumber) * Number(secondNumber));
        break;
      }
    }
    setAnswer(answer);
    setHistory((oldHistory) => {
      return [
        ...oldHistory,
        {
          answer: answer as string,
          firstNumber: firstNumber as string,
          secondNumber: secondNumber as string,
          operator: operator as string,
        },
      ];
    });
  };

  const handleOperator = (operator: string) => {
    if (answer != null) {
      setAnswer(null);
      setSecondNumber(null);
      setOperator(operator);
      setFirstNumber(answer);
      return;
    }
    if (secondNumber != null) return;
    setOperator(operator);
  };

  const handleDigit = (digit: string) => {
    if (answer != null) {
      setAnswer(null);
      setSecondNumber(null);
      setOperator(null);
      setFirstNumber(() => {
        if (answer === "0") return digit;
        return answer + digit;
      });
      return;
    }
    if (!operator) {
      return setFirstNumber((prev) => {
        if (digit === "0") {
          if (prev === "0") return "0";
          if (prev === "-0") return "-0";
        }
        if (prev === "0" || prev === "-0") return digit;
        return `${prev}${digit}`;
      });
    }
    setSecondNumber((prev) => {
      if (prev == null) return digit;
      if (digit === "0") {
        if (prev === "0") return "0";
        if (prev === "-0") return "-0";
      }
      if (prev === "0" || prev === "-0") return digit;
      return `${prev}${digit}`;
    });
  };

  const handleDot = () => {
    if (answer != null) {
      if (answer.includes(".")) return;
      setAnswer(null);
      setSecondNumber(null);
      setOperator(null);
      setFirstNumber(() => {
        return answer + ".";
      });
      return;
    }
    if (!operator) {
      if (firstNumber.includes(".")) return null;
      return setFirstNumber((prev) => {
        return prev + ".";
      });
    }
    if (secondNumber != null && secondNumber.includes(".")) return null;
    setSecondNumber((prev) => {
      return prev + ".";
    });
  };

  const handleDelete = () => {
    if (answer != null) {
      setAnswer(null);
      setSecondNumber(null);
      setOperator(null);
      setFirstNumber(() => {
        if (answer === "0" || answer.length === 1) return "0";
        return answer.slice(0, -1);
      });
      return;
    }

    if (secondNumber != null) {
      return setSecondNumber((prev) => {
        if (prev == null || prev.length === 1) return null;
        return prev.slice(0, -1);
      });
    }

    if (operator != null) {
      return setOperator(null);
    }

    return setFirstNumber((prev) => {
      if (prev.length === 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const handleFlipSign = () => {
    if (answer != null) {
      setAnswer(null);
      setSecondNumber(null);
      setOperator(null);
      setFirstNumber(() => {
        if (answer.includes("-")) {
          return answer.replace("-", "");
        }
        return "-" + answer;
      });
      return;
    }
    if (!operator) {
      return setFirstNumber((prev) => {
        if (prev.includes("-")) {
          return prev.replace("-", "");
        }
        return "-" + prev;
      });
    }
    setSecondNumber((prev) => {
      if (prev == null) return null;
      if (prev.includes("-")) {
        return prev.replace("-", "");
      }
      return "-" + prev;
    });
  };

  const handleSpecial = (specialSign: string) => {
    if (specialSign === "DEL") {
      return handleDelete();
    }
    if (specialSign === "FLIP_SIGN") {
      return handleFlipSign();
    }
    if (specialSign === ".") {
      return handleDot();
    }
    if (specialSign === "AC") {
      return reset();
    }
    if (specialSign === "=") {
      if (secondNumber == null || answer != null) return;
      calculate();
    }
  };

  const reset = () => {
    setFirstNumber("0");
    setSecondNumber(null);
    setOperator(null);
    setAnswer(null);
  };

  const handleCalculatorButtonClick = (value: string) => {
    const isKnownValue = [DIGITS, OPERATORS, SPECIAL].some((valueType) =>
      valueType.includes(value)
    );
    if (isKnownValue) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }
    if (DIGITS.includes(value)) {
      handleDigit(value);
      return;
    }

    if (OPERATORS.includes(value)) {
      handleOperator(value);
      return;
    }

    if (SPECIAL.includes(value)) {
      handleSpecial(value);
      return;
    }
  };

  const openHistory = () => setIsHistoryOpened(true);
  const closeHistory = () => setIsHistoryOpened(false);

  return (
    <div className="relative flex min-h-[600px] w-[20rem] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
      {isHistoryOpened && (
        <FocusTrap>
          <div
            ref={historyContainerRef}
            className="absolute top-0 z-10 h-full w-full bg-blue-50 text-slate-900 opacity-75"
          >
            <div>
              <button onClick={closeHistory}>Close</button>
            </div>
            <div>
              <button onClick={closeHistory}>Another button</button>
            </div>
            <div>
              <button onClick={closeHistory}>And another one</button>
            </div>
            History:
            {history.map(
              ({ firstNumber, secondNumber, operator, answer }, index) => {
                const key = `${firstNumber}_${secondNumber}_${operator}_${answer}_${index}`;
                return (
                  <div key={key}>
                    <button>
                      {firstNumber} {operator} {secondNumber} = {answer}
                    </button>
                  </div>
                );
              }
            )}
          </div>
        </FocusTrap>
      )}
      <div
        ref={openHistoryButtonRef}
        className="hidden items-center justify-center sm:flex"
      >
        <button
          onClick={openHistory}
          className="mt-2 flex items-center justify-center gap-1 self-center rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-900"
        >
          History
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <Display
        firstNumber={firstNumber}
        secondNumber={secondNumber}
        answer={answer}
        operator={operator}
      />
      <CalculatorButtons
        afterClick={handleCalculatorButtonClick}
        pressedKeys={pressedKeys}
      />
    </div>
  );
};

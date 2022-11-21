import { useEffect, useRef, useState } from "react";
import { DIGITS, OPERATORS, SPECIAL } from "@/constants/calculator";
import { useEventListener } from "usehooks-ts";
import { useEasterEggs } from "@/hooks/useEasterEggs";
import { CalculatorButtons } from "@/components/CalculatorButtons";
import { Display } from "@/components/Display";
import { History } from "@/types/calculator";
import * as Tooltip from "@radix-ui/react-tooltip";
import FocusTrap from "focus-trap-react";

export const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const { easterEgg, checkForEasterEgg } = useEasterEggs({ value: answer });
  const [history, setHistory] = useState<History[]>([]);
  const [isHistoryOpened, setIsHistoryOpened] = useState(false);
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const openHistoryButtonRef = useRef<HTMLDivElement>(null);
  const shouldIgnoreKeyboardEvents = [historyContainerRef, openHistoryButtonRef].some((elementRef) => {
    return elementRef.current?.contains(document.activeElement);
  });

  useEffect(() => {
    checkForEasterEgg();
  }, [answer, checkForEasterEgg]);

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
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
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
        if (prev === "0" && digit === "0") return "0";
        if (prev === "0") return digit;
        return `${prev}${digit}`;
      });
    }
    setSecondNumber((prev) => {
      if (prev == null) return digit;
      if (prev === "0" && digit === "0") return "0";
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

  const handleSpecial = (specialSign: string) => {
    if (specialSign === "DEL") {
      if (answer != null) {
        setAnswer(null);
        setSecondNumber(null);
        setOperator(null);
        setFirstNumber(() => {
          if (answer === "0") return "0";
          return answer.slice(0, -1);
        });
        return;
      }

      if (secondNumber != null) {
        return setSecondNumber((prev) => {
          if (prev == null) return null;
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
    // resetEasterEgg();
    setFirstNumber("0");
    setSecondNumber(null);
    setOperator(null);
    setAnswer(null);
  };

  const handleCalculatorButtonClick = (value: string) => {
    // if (easterEgg !== EasterEggs.NONE) {
    //   reset();
    // }
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
    <div className="relative flex w-[20rem] min-h-[600px] flex-col bg-white shadow-2xl rounded-2xl overflow-hidden">
      {isHistoryOpened && (
        <FocusTrap>
          <div
            ref={historyContainerRef}
            className="text-slate-900 opacity-75 h-full w-full z-10 top-0 absolute bg-blue-50"
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
            {history.map(({ firstNumber, secondNumber, operator, answer }, index) => {
              return (
                <div key={`${firstNumber}_${secondNumber}_${operator}_${answer}_${index}`}>
                  <button>
                    {firstNumber} {operator} {secondNumber} = {answer}
                  </button>
                </div>
              );
            })}
          </div>
        </FocusTrap>
      )}
      <div ref={openHistoryButtonRef} className="hidden sm:flex items-center justify-center">
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={openHistory}
                className="text-xs bg-slate-100 gap-1 mt-2 self-center flex items-center justify-center px-4 py-1 rounded-full text-slate-900"
              >
                History
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M10 5a.75.75 0 01.75.75v6.638l1.96-2.158a.75.75 0 111.08 1.04l-3.25 3.5a.75.75 0 01-1.08 0l-3.25-3.5a.75.75 0 111.08-1.04l1.96 2.158V5.75A.75.75 0 0110 5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                onEscapeKeyDown={(e) => e.preventDefault()}
                className="bg-slate-900 text-white shadow-md flex gap-2 items-center rounded-full px-4 py-2 text-sm leading-none"
                sideOffset={5}
                side="bottom"
              >
                History of past calculations
                <div className="text-xs py-1 px-2 bg-violet-100 text-violet-500 rounded-sm leading-none">
                  Coming soon
                </div>
                <Tooltip.Arrow className="fill-slate-900" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>

      <Display
        firstNumber={firstNumber}
        secondNumber={secondNumber}
        answer={answer}
        operator={operator}
        easterEgg={easterEgg}
      />
      <CalculatorButtons afterClick={handleCalculatorButtonClick} pressedKeys={pressedKeys} />
    </div>
  );
};

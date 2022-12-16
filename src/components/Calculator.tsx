import {
  createRef,
  FocusEvent,
  MouseEvent,
  MouseEventHandler,
  RefObject,
  useRef,
  useState,
} from "react";
import { DIGITS, OPERATORS, SPECIAL } from "@/constants/calculator";
import { useEventListener } from "usehooks-ts";
import { CalculatorButtons } from "@/components/CalculatorButtons";
import { Display } from "@/components/Display";
import { ButtonLocation, History } from "@/types/calculator";
import FocusTrap from "focus-trap-react";
import { ScrollBlock } from "@/components/ScrollBlock";

// {} - colored
// [] - bgColored
const layout = [
  ["AC", "FLIP_SIGN", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["{DEL}", "0", ".", "[=]"],
];

const cleanLayout = layout.map((rows) =>
  rows.map((value) => value.replaceAll(/(\{|\}|\[|\])/g, ""))
);

export const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [history, setHistory] = useState<History[]>([]);
  const [isHistoryOpened, setIsHistoryOpened] = useState(false);
  const shouldClearFocusAfterHistoryClose = useRef(false);
  const [focusedLocation, setFocusedLocation] = useState<ButtonLocation | null>(
    null
  );
  const [layoutRefs, setLayoutRefs] = useState<
    RefObject<HTMLButtonElement>[][]
  >(() => {
    const layoutRefs = new Array(layout.length);
    layout.forEach(
      (element, idx) =>
        (layoutRefs[idx] = new Array(element.length).fill(createRef()))
    );
    return layoutRefs;
  });
  const calculatorContainerRef = useRef<HTMLDivElement>(null);

  useEventListener("keyup", () => {
    setPressedKeys([]);
  });

  useEventListener("keydown", (e) => {
    let pressedKey = e.key;

    if (pressedKey === "Escape" && isHistoryOpened) {
      closeHistory(e);
      return;
    }

    if (
      !(e instanceof KeyboardEvent) ||
      isHistoryOpened ||
      e.ctrlKey ||
      e.altKey
    )
      return;

    if (!calculatorContainerRef.current?.contains(document.activeElement)) {
      const replace: Record<string, string> = {
        Backspace: "DEL",
        Delete: "AC",
        c: "AC",
        Enter: "=",
        ",": ".",
      };

      if (pressedKey in replace) {
        pressedKey = replace[pressedKey];
      }

      handleCalculatorButtonClick(pressedKey);
      return;
    }

    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(pressedKey)
    ) {
      if (focusedLocation == null) return;
      const { rowIdx, columnIdx } = focusedLocation;
      let nextFocusTarget: RefObject<HTMLButtonElement> | null = null;
      switch (pressedKey) {
        case "ArrowUp": {
          nextFocusTarget = layoutRefs[rowIdx - 1]?.[columnIdx];
          break;
        }
        case "ArrowDown": {
          nextFocusTarget = layoutRefs[rowIdx + 1]?.[columnIdx];
          break;
        }
        case "ArrowLeft": {
          nextFocusTarget = layoutRefs[rowIdx][columnIdx - 1];
          break;
        }
        case "ArrowRight": {
          nextFocusTarget = layoutRefs[rowIdx][columnIdx + 1];
          break;
        }
      }
      if (nextFocusTarget != null) {
        nextFocusTarget?.current?.focus();
      }
      return;
    }

    // setPressedKeys((prevKeys) => [...prevKeys, pressedKey]);
    const replace: Record<string, string> = {
      Backspace: "DEL",
      Delete: "AC",
      c: "AC",
      ",": ".",
    };

    if (pressedKey in replace) {
      pressedKey = replace[pressedKey];
    }

    const index1D = cleanLayout.flat().indexOf(pressedKey);
    if (index1D !== -1) {
      const buttonsInOneRow = layout[0].length;
      const rowsIdx = Math.floor(index1D / buttonsInOneRow);
      const columnIdx = index1D % buttonsInOneRow;
      layoutRefs[rowsIdx][columnIdx].current?.focus();

      handleCalculatorButtonClick(pressedKey);
    }
  });

  const initButton = (
    rowIdx: number,
    columnIdx: number,
    ref: RefObject<HTMLButtonElement>
  ) => {
    setLayoutRefs((prevLayoutRefs) => {
      const layoutRefsCopy = [...prevLayoutRefs];
      layoutRefsCopy[rowIdx][columnIdx] = ref;
      return [...prevLayoutRefs];
    });
  };

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
      if (prev.includes("-") && prev.length === 2) return "0";
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

  const handleCalculatorButtonFocus = (
    e: FocusEvent<HTMLButtonElement, Element>,
    location: ButtonLocation
  ) => {
    setFocusedLocation({
      rowIdx: location.rowIdx,
      columnIdx: location.columnIdx,
    });
  };

  const openHistory: MouseEventHandler = () => {
    setIsHistoryOpened(true);
  };
  const closeHistory = (e: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
    if (e instanceof KeyboardEvent) {
      setIsHistoryOpened(false);
      return;
    }
    const isKeyboard = e.detail === 0;
    if (!isKeyboard && document.activeElement instanceof HTMLElement) {
      shouldClearFocusAfterHistoryClose.current = true;
    }
    setIsHistoryOpened(false);
  };
  const handleAfterHistoryClosed = () => {
    if (
      shouldClearFocusAfterHistoryClose.current &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
      shouldClearFocusAfterHistoryClose.current = false;
    }
  };

  const applyState = (
    firstNumber: string,
    secondNumber: string,
    operator: string,
    answer: string
  ) => {
    setFirstNumber(firstNumber);
    setSecondNumber(secondNumber);
    setOperator(operator);
    setAnswer(answer);
  };

  return (
    <div
      ref={calculatorContainerRef}
      className="relative flex min-h-[600px] w-[20rem] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
    >
      {isHistoryOpened && (
        <FocusTrap
          focusTrapOptions={{
            escapeDeactivates: false,
            onPostDeactivate: handleAfterHistoryClosed,
          }}
        >
          <div className="absolute top-0 z-10 flex h-full w-full flex-col gap-4 bg-slate-100 p-5 text-slate-900">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold">History</h2>
              <button
                onClick={closeHistory}
                className="focus-visible:outline-violet-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="h-8 w-8 p-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {history.length > 0 ? (
              <ScrollBlock
                theme="dark"
                orientation="vertical"
                className="flex flex-1 flex-col overflow-hidden"
              >
                <div className="flex flex-1 flex-col gap-2 pb-1">
                  {history.map(
                    (
                      { firstNumber, secondNumber, operator, answer },
                      index
                    ) => {
                      const key = `${firstNumber}_${secondNumber}_${operator}_${answer}_${index}`;
                      return (
                        <button
                          key={key}
                          onClick={(e) => {
                            applyState(
                              firstNumber,
                              secondNumber,
                              operator,
                              answer
                            );
                            closeHistory(e);
                          }}
                          className="rounded-md border-2 border-white bg-white px-4 py-2 text-right shadow focus-visible:outline-violet-500"
                        >
                          <div className="text-sm text-violet-500">
                            {firstNumber} {operator} {secondNumber} =
                          </div>
                          <div className="text-2xl">{answer}</div>
                        </button>
                      );
                    }
                  )}
                </div>
              </ScrollBlock>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-14 w-14"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
                <h2 className="mb-2 text-xl">Nothing found</h2>
                <button
                  onClick={closeHistory}
                  className="mb-8 rounded-full bg-violet-200 px-6 py-2 text-sm text-violet-500 duration-75 hover:bg-violet-400 hover:text-white"
                >
                  Start calculating
                </button>
              </div>
            )}
          </div>
        </FocusTrap>
      )}
      <button
        onClick={openHistory}
        className="mt-2 flex items-center justify-center gap-1 self-center rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-900 focus-visible:outline-violet-500"
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
      <Display
        firstNumber={firstNumber}
        secondNumber={secondNumber}
        answer={answer}
        operator={operator}
      />
      <CalculatorButtons
        layout={layout}
        initButton={initButton}
        afterClick={handleCalculatorButtonClick}
        pressedKeys={pressedKeys}
        onButtonFocus={handleCalculatorButtonFocus}
      />
    </div>
  );
};

import { useEffect, useState } from "react";
import { DIGITS, OPERATORS, SPECIAL } from "@/constants/calculator";
import { useEventListener } from "usehooks-ts";
import { useEasterEggs } from "@/hooks/useEasterEggs";
import { CalculatorButtons } from "@/components/CalculatorButtons";
import { Display } from "@/components/Display";
import { History } from "@/types/calculator";

export const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const { easterEgg, checkForEasterEgg } = useEasterEggs({ value: answer });
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    checkForEasterEgg();
  }, [answer, checkForEasterEgg]);

  const updatePressedKeys = ({ key, action }: { key: string; action: "add" | "remove" }) => {
    if (action === "add") {
      setPressedKeys((prevKeys) => [...prevKeys, key]);
      return;
    }
    setTimeout(() => {
      setPressedKeys((prevKeys) => prevKeys.filter((k) => k != key));
    }, 75);
  };

  useEventListener("keyup", (e) => {
    if (!(e instanceof KeyboardEvent)) return;
    let pressedKey = e.key;
    const replace: Record<string, string> = {
      Backspace: "DEL",
      Enter: "=",
      c: "C",
    };
    if (pressedKey in replace) {
      pressedKey = replace[pressedKey];
    }
    updatePressedKeys({ key: pressedKey, action: "remove" });
  });

  useEventListener("keydown", (e) => {
    if (!(e instanceof KeyboardEvent)) return;
    let pressedKey = e.key;
    const replace: Record<string, string> = {
      Backspace: "DEL",
      Enter: "=",
      c: "C",
    };
    if (pressedKey in replace) {
      pressedKey = replace[pressedKey];
    }
    updatePressedKeys({ key: pressedKey, action: "add" });
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
    if (specialSign === "C") {
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

  return (
    <>
      <div className="flex w-[300px] min-h-[450px] flex-col p-5 bg-slate-50 shadow-2xl rounded-2xl">
        <Display
          firstNumber={firstNumber}
          secondNumber={secondNumber}
          answer={answer}
          operator={operator}
          easterEgg={easterEgg}
        />
        <CalculatorButtons afterClick={handleCalculatorButtonClick} pressedKeys={pressedKeys} />
      </div>
      <pre className="text-slate-900 text-xs ml-4">
        <p>History</p>
        <code>{JSON.stringify(history, null, 2)}</code>
      </pre>
    </>
  );
};

import { useState } from "react";
import { DIGITS, OPERATORS, SPECIAL } from "@/constants/calculator";
import { EasterEggs, useEasterEggs } from "@/hooks/useEasterEggs";
import { CalculatorButtons } from "@/components/CalculatorButtons";
import { Display } from "@/components/Display";

export const Calculator = () => {
  const [firstNumber, setFirstNumber] = useState("0");
  const [secondNumber, setSecondNumber] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const { easterEgg, checkForEasterEgg, reset: resetEasterEgg } = useEasterEggs({ value: firstNumber });

  const calculate = () => {
    switch (operator) {
      case "+": {
        setAnswer(String(Number(firstNumber) + Number(secondNumber)));
        break;
      }
      case "-": {
        setAnswer(String(Number(firstNumber) - Number(secondNumber)));
        break;
      }
      case "/": {
        setAnswer(String(Number(firstNumber) / Number(secondNumber)));
        break;
      }
      case "*": {
        setAnswer(String(Number(firstNumber) * Number(secondNumber)));
        break;
      }
    }
  };

  const handleOperator = (operator: string) => {
    if (secondNumber != null) return;
    setOperator(operator);
  };

  const handleDigit = (digit: string) => {
    if (answer != null) return;
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
    if (answer != null || firstNumber == null) return;
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
      if (answer != null) return;
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
      const isEasterEgg = checkForEasterEgg();
      if (isEasterEgg || secondNumber == null) return;
      calculate();
    }
  };

  const reset = () => {
    resetEasterEgg();
    setFirstNumber("0");
    setSecondNumber(null);
    setOperator(null);
    setAnswer(null);
  };

  const handleCalculatorButtonClick = (value: string) => {
    if (easterEgg !== EasterEggs.NONE) {
      reset();
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

  return (
    <div className="flex w-[300px] min-h-[450px] flex-col p-5 bg-slate-50 shadow-2xl rounded-2xl">
      <Display
        firstNumber={firstNumber}
        secondNumber={secondNumber}
        answer={answer}
        operator={operator}
        easterEgg={easterEgg}
      />
      <CalculatorButtons afterClick={handleCalculatorButtonClick} />
    </div>
  );
};

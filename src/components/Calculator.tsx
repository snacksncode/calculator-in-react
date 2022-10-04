import { useEffect, useState } from "react";
import { Display } from "./Display";
import { CalculatorButtons } from "./CalculatorButtons";
import { EasterEggs, useEasterEggs } from "../hooks/useEasterEggs";
import { DIGITS, OPERATORS, SPECIAL } from "../constants/calculator";
import { SECRET_STRING } from "../constants/easter-eggs";

export const Calculator = () => {
  // Visual State
  const [mainDisplayValue, setMainDisplayValue] = useState<string | null>(null);
  const [topDisplayValue, setTopDisplayValue] = useState<string | null>(null);
  // Actual calculator logic/state
  const [digits, setDigits] = useState<string[]>([]);
  const [answer, setAnswer] = useState<number | null>(null);
  // Easter Eggs
  const { easterEgg, checkForEasterEgg, reset: resetEasterEgg } = useEasterEggs({ value: mainDisplayValue });

  useEffect(() => {
    const allDigitsCombined = digits.join("");
    setMainDisplayValue(allDigitsCombined || "0");
  }, [digits]);

  useEffect(() => {
    if (easterEgg === EasterEggs.SECRET_STRING) {
      setMainDisplayValue(SECRET_STRING);
    }
  }, [easterEgg]);

  const handleOperator = (operator: string) => {
    console.warn("Not implemented");
  };

  const handleDigit = (digit: string) => {
    setDigits((oldDigitsState) => {
      return [...oldDigitsState, digit];
    });
  };

  const handleSpecial = (specialSign: string) => {
    if (specialSign === "DEL") {
      setDigits((oldDigitsState) => oldDigitsState.slice(0, -1));
      return;
    }
    if (specialSign === "C") {
      setDigits([]);
      return;
    }
    if (specialSign === "=") {
      checkForEasterEgg();
    }
  };

  const reset = () => {
    resetEasterEgg();
    setDigits([]);
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
    <div className="flex min-w-[300px] min-h-[450px] flex-col p-5 bg-slate-50 shadow-2xl rounded-2xl">
      <Display mainValue={mainDisplayValue} topValue={topDisplayValue} easterEgg={easterEgg} />
      <CalculatorButtons afterClick={handleCalculatorButtonClick} />
    </div>
  );
};

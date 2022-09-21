import { useState } from "react";
import { Display } from "./Display";
import { CalculatorButtons } from "./CalculatorButtons";

export const Calculator = () => {
  const [mainDisplayValue, setMainDisplayValue] = useState<string | null>(null);
  const [topDisplayValue, setTopDisplayValue] = useState<string | null>(null);

  const handleCalculatorButtonClick = (value: string) => {
    setMainDisplayValue(value);
    setTopDisplayValue(value);
  };

  return (
    <div className="flex min-w-[300px] min-h-[450px] flex-col p-5 bg-slate-50 shadow-2xl rounded-2xl">
      <Display mainValue={mainDisplayValue} topValue={topDisplayValue} />
      <CalculatorButtons afterClick={handleCalculatorButtonClick} />
    </div>
  );
};

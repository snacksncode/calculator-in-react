import { FC, useMemo } from "react";
import { ScrollBlock } from "@/components/ScrollBlock";

interface Props {
  firstNumber: string | null;
  secondNumber: string | null;
  operator: string | null;
  answer: string | null;
}

export const Display: FC<Props> = ({
  firstNumber,
  secondNumber,
  operator,
  answer,
}) => {
  const formatOperator = (operator: string | null) => {
    if (operator == null) return;
    switch (operator) {
      case "*":
        return "×";
      case "/":
        return "÷";
      default:
        return operator;
    }
  };

  const expression = useMemo(() => {
    if (answer != null)
      return `${firstNumber} ${formatOperator(operator)} ${secondNumber} =`;
    if (!operator) return null;
    return `${firstNumber} ${formatOperator(operator)}`;
  }, [answer, firstNumber, operator, secondNumber]);

  const mainDisplay: string | null = useMemo(() => {
    if (answer != null) return String(answer);
    if (!firstNumber) return "0";
    if (operator && !secondNumber) return null;
    if (!secondNumber) return firstNumber;
    return secondNumber;
  }, [answer, firstNumber, operator, secondNumber]);

  return (
    <div className="relative isolate mb-2  flex flex-1 flex-col items-end justify-end px-5">
      <div className="max-w-full rounded text-right font-bold text-slate-800">
        <div className="text-right text-base font-medium text-violet-500 opacity-80">
          <ScrollBlock
            theme="dark"
            className="overflow-hidden whitespace-nowrap pb-2"
            forceChildAlignEnd
          >
            {expression}
          </ScrollBlock>
        </div>
        <ScrollBlock
          theme="dark"
          className="min-h-[56px] overflow-hidden pb-2 text-end text-5xl"
          forceChildAlignEnd
        >
          {mainDisplay}
        </ScrollBlock>
      </div>
    </div>
  );
};

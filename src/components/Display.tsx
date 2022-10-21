import { SECRET_STRING } from "@/constants/easter-eggs";
import { EasterEggs } from "@/hooks/useEasterEggs";
import { useMemo } from "react";
import { ScrollBlock } from "@/components/ScrollBlock";

interface Props {
  firstNumber: string | null;
  secondNumber: string | null;
  operator: string | null;
  answer: string | null;
  easterEgg: EasterEggs;
}

export const Display = ({ firstNumber, secondNumber, answer, operator, easterEgg }: Props) => {
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
    if (answer != null) return `${firstNumber} ${formatOperator(operator)} ${secondNumber} =`;
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

  const getMainDisplay = () => {
    if (easterEgg === EasterEggs.SECRET_STRING) {
      return SECRET_STRING;
    }
    if (mainDisplay == null) return null;
    return mainDisplay;
  };

  return (
    <div>
      <div className="text-base min-h-[32px] text-blue-400 font-medium text-right opacity-80">
        <ScrollBlock theme="dark" className="whitespace-nowrap pb-2">
          {expression}
        </ScrollBlock>
      </div>
      <div className="relative isolate">
        {easterEgg === EasterEggs.GREEN && (
          <svg
            className="fill-green-600 w-12 absolute z-10 top-0 left-0 rotate-[30deg] -translate-x-3 -translate-y-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 0c5.3 0 10.3 2.7 13.3 7.1c15.8 23.5 36.7 63.7 49.2 109c7.2 26.4 11.8 55.2 10.4 84c11.5-8.8 23.7-16.7 35.8-23.6c41-23.3 84.4-36.9 112.2-42.5c5.2-1 10.7 .6 14.4 4.4s5.4 9.2 4.4 14.5c-5.6 27.7-19.3 70.9-42.7 111.7c-9.1 15.9-19.9 31.7-32.4 46.3c27.8 6.6 52.4 17.3 67.2 25.5c5.1 2.8 8.2 8.2 8.2 14s-3.2 11.2-8.2 14c-15.2 8.4-40.9 19.5-69.8 26.1c-20.2 4.6-42.9 7.2-65.2 4.6l8.3 33.1c1.5 6.1-.6 12.4-5.5 16.4s-11.6 4.6-17.2 1.9L280 417.2V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V417.2l-58.5 29.1c-5.6 2.8-12.3 2.1-17.2-1.9s-7-10.3-5.5-16.4l8.3-33.1c-22.2 2.6-45 0-65.2-4.6c-28.9-6.6-54.6-17.6-69.8-26.1c-5.1-2.8-8.2-8.2-8.2-14s3.2-11.2 8.2-14c14.8-8.2 39.4-18.8 67.2-25.5C78.9 296.3 68.1 280.5 59 264.6c-23.4-40.8-37.1-84-42.7-111.7c-1.1-5.2 .6-10.7 4.4-14.5s9.2-5.4 14.4-4.4c27.9 5.5 71.2 19.2 112.2 42.5c12.1 6.9 24.3 14.7 35.8 23.6c-1.4-28.7 3.1-57.6 10.4-84c12.5-45.3 33.4-85.5 49.2-109c3-4.4 8-7.1 13.3-7.1z" />
          </svg>
        )}
        <div className="overflow-auto text-4xl mt-2 min-h-[80px] rounded text-right font-bold bg-gradient-to-r from-sky-300 to-blue-300">
          <ScrollBlock theme="light" className="py-5 px-3">
          {getMainDisplay()}
          </ScrollBlock>
        </div>
        <div className="bg-blue-200 rounded -z-10 scale-95 absolute w-full h-full top-2 left-0"></div>
        <div className="bg-blue-100 rounded -z-20 scale-90 absolute w-full h-full top-4 left-0"></div>
      </div>
    </div>
  );
};

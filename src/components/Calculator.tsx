import { TallCalculatorButton } from "./CalculatorButton/TallCalculatorButton";
import { CalculatorButton } from "./CalculatorButton/CalculatorButton";

export const Calculator = () => {
  return (
    <div className="flex min-w-[300px] min-h-[450px] flex-col p-5 bg-slate-50 shadow-2xl rounded-2xl">
      <div>
        <div className="text-base text-blue-400 font-medium text-right opacity-80">2 + 2 =</div>
        <div className="relative isolate">
          <div className="text-4xl rounded mt-2 px-3 py-5 text-right font-semibold bg-gradient-to-r from-sky-300 to-blue-300">
            6
          </div>
          <div className="bg-blue-200 rounded -z-10 scale-95 absolute w-full h-full top-2 left-0"></div>
          <div className="bg-blue-100 rounded -z-20 scale-90 absolute w-full h-full top-4 left-0"></div>
        </div>
      </div>
      <div className="grid flex-1 gap-2 mt-8 grid-cols-4 grid-rows-5">
        <CalculatorButton value="C" />
        <CalculatorButton value="/" />
        <CalculatorButton value="*" />
        <CalculatorButton color value="DEL" />

        <CalculatorButton value="7" />
        <CalculatorButton value="8" />
        <CalculatorButton value="9" />
        <CalculatorButton value="-" />

        <CalculatorButton value="4" />
        <CalculatorButton value="5" />
        <CalculatorButton value="6" />
        <CalculatorButton value="+" />

        <CalculatorButton value="1" />
        <CalculatorButton value="2" />
        <CalculatorButton value="3" />
        <TallCalculatorButton value="=" />

        <CalculatorButton value="%" />
        <CalculatorButton value="0" />
        <CalculatorButton value="." />
      </div>
    </div>
  );
};

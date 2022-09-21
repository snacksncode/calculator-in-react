import { CalculatorButton } from "./CalculatorButton/CalculatorButton";
import { TallCalculatorButton } from "./CalculatorButton/TallCalculatorButton";

interface Props {
  afterClick: (value: string) => void;
}

export const CalculatorButtons = ({ afterClick }: Props) => {
  return (
    <div className="grid flex-1 gap-2 mt-8 grid-cols-4 grid-rows-5">
      <CalculatorButton afterClick={afterClick} value="C" />
      <CalculatorButton afterClick={afterClick} value="/" />
      <CalculatorButton afterClick={afterClick} value="*" />
      <CalculatorButton afterClick={afterClick} color value="DEL" />

      <CalculatorButton afterClick={afterClick} value="7" />
      <CalculatorButton afterClick={afterClick} value="8" />
      <CalculatorButton afterClick={afterClick} value="9" />
      <CalculatorButton afterClick={afterClick} value="-" />

      <CalculatorButton afterClick={afterClick} value="4" />
      <CalculatorButton afterClick={afterClick} value="5" />
      <CalculatorButton afterClick={afterClick} value="6" />
      <CalculatorButton afterClick={afterClick} value="+" />

      <CalculatorButton afterClick={afterClick} value="1" />
      <CalculatorButton afterClick={afterClick} value="2" />
      <CalculatorButton afterClick={afterClick} value="3" />
      <TallCalculatorButton afterClick={afterClick} value="=" />

      <CalculatorButton afterClick={afterClick} value="%" />
      <CalculatorButton afterClick={afterClick} value="0" />
      <CalculatorButton afterClick={afterClick} value="." />
    </div>
  );
};

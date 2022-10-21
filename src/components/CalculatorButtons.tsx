import { CalculatorButton } from "./CalculatorButton/CalculatorButton";
import { TallCalculatorButton } from "./CalculatorButton/TallCalculatorButton";

interface Props {
  afterClick: (value: string) => void;
  pressedKeys: string[];
}

export const CalculatorButtons = ({ afterClick, pressedKeys }: Props) => {
  return (
    <div className="grid flex-1 gap-2 mt-8 grid-cols-4 grid-rows-5">
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="C" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="/" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="*" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} color value="DEL" />

      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="7" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="8" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="9" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="-" />

      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="4" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="5" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="6" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="+" />

      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="1" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="2" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="3" />
      <TallCalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="=" />

      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="%" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="0" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="." />
    </div>
  );
};

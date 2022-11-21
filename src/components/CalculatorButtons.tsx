import { CalculatorButton } from "./CalculatorButton/CalculatorButton";

interface Props {
  afterClick: (value: string) => void;
  pressedKeys: string[];
}

export const CalculatorButtons = ({ afterClick, pressedKeys }: Props) => {
  return (
    <div className="grid bg-slate-50 p-5 rounded-t-3xl gap-2 grid-cols-4 grid-rows-5">
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="AC" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="FLIP_SIGN" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="%" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="/" />

      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="7" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="8" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="9" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="*" />

      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="4" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="5" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="6" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="-" />

      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="1" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="2" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="3" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="+" />

      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} colored value="DEL" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="0" />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} value="." />
      <CalculatorButton afterClick={afterClick} pressedKeys={pressedKeys} bgColored value="=" />
    </div>
  );
};

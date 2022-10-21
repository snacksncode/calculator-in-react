import { useIsHighlighted } from "../../hooks/useIsHighlighted";
import { buttonClasses, formatValue } from "./shared";

interface Props {
  value: string;
  color?: boolean;
  pressedKeys: string[];
  afterClick: (value: string) => void;
}

export const CalculatorButton = ({ value, color, afterClick, pressedKeys }: Props) => {
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    afterClick(value);
  };
  const { isHighlighted } = useIsHighlighted({ value, pressedKeys });

  return (
    <button
      onClick={handleButtonClick}
      className={`${color ? "text-blue-300" : "text-slate-900"} ${
        isHighlighted ? "bg-blue-300 text-white" : color ? "text-blue-300" : "text-slate-900"
      } ${buttonClasses}`}
    >
      {formatValue(value)}
    </button>
  );
};

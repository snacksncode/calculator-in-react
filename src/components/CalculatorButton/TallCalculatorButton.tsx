import { useIsHighlighted } from "../../hooks/useIsHighlighted";
import { buttonClasses, formatValue } from "./shared";

interface Props {
  value: string;
  afterClick: (value: string) => void;
  pressedKeys: string[];
}

export const TallCalculatorButton = ({ value, afterClick, pressedKeys }: Props) => {
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    afterClick(value);
  };
  const { isHighlighted } = useIsHighlighted({ value, pressedKeys });

  return (
    <button
      onClick={handleButtonClick}
      className={`${isHighlighted ? "bg-blue-300 text-white" : "bg-sky-200 text-blue-500"} row-span-2 ${buttonClasses}`}
    >
      {formatValue(value)}
    </button>
  );
};

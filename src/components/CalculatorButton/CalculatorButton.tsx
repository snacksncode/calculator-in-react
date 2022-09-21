import { buttonClasses, formatValue } from "./shared";

interface Props {
  value: string;
  color?: boolean;
  afterClick: (value: string) => void;
}

export const CalculatorButton = ({ value, color, afterClick }: Props) => {
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    afterClick(value);
  };
  return (
    <button onClick={handleButtonClick} className={`${color ? "text-blue-300" : "text-slate-900"} ${buttonClasses}`}>
      {formatValue(value)}
    </button>
  );
};

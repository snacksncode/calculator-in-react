import { buttonClasses, formatValue } from "./shared";

interface Props {
  value: string;
  color?: boolean;
}

export const CalculatorButton = ({ value, color }: Props) => {
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("handler inside normal button");
  };
  return (
    <button onClick={handleButtonClick} className={`${color ? "text-blue-300" : "text-slate-900"} ${buttonClasses}`}>
      {formatValue(value)}
    </button>
  );
};

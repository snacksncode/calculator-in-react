import { buttonClasses, formatValue } from "./shared";

interface Props {
  value: string;
}

export const TallCalculatorButton = ({ value }: Props) => {
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("handler inside tall button");
  };

  return (
    <button onClick={handleButtonClick} className={`bg-sky-200 text-blue-500 row-span-2 ${buttonClasses}`}>
      {formatValue(value)}
    </button>
  );
};

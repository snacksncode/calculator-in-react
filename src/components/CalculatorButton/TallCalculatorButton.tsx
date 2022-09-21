import { buttonClasses, formatValue } from "./shared";

interface Props {
  value: string;
  afterClick: (value: string) => void;
}

export const TallCalculatorButton = ({ value, afterClick }: Props) => {
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    afterClick(value);
  };

  return (
    <button onClick={handleButtonClick} className={`bg-sky-200 text-blue-500 row-span-2 ${buttonClasses}`}>
      {formatValue(value)}
    </button>
  );
};

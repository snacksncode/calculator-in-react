// import { useIsHighlighted } from "../../hooks/useIsHighlighted";
// import { buttonClasses, formatValue } from "./shared";
export {};

// interface Props {
//   value: string;
//   afterClick: (value: string) => void;
//   pressedKeys: string[];
// }

// export const TallCalculatorButton = ({ value, afterClick, pressedKeys }: Props) => {
//   const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
//     afterClick(value);
//   };
//   const { isHighlighted } = useIsHighlighted({ value, pressedKeys });

//   return (
//     <button
//       onClick={handleButtonClick}
//       className={`${isHighlighted ? "transition-none" : "transition-colors"}
//       ${isHighlighted ? "bg-violet-300 text-white" : "bg-violet-200 text-violet-500"} row-span-2 ${buttonClasses}`}
//     >
//       {formatValue(value)}
//     </button>
//   );
// };

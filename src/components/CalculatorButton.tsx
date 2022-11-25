import { useIsHighlighted } from "@/hooks/useIsHighlighted";
import {
  FC,
  FocusEvent,
  FocusEventHandler,
  RefObject,
  useEffect,
  useRef,
} from "react";

interface Props {
  value: string;
  colored?: boolean;
  bgColored?: boolean;
  pressedKeys: string[];
  location: { rowIdx: number; columnIdx: number };
  onClick: (value: string) => void;
  onFocus: (
    e: FocusEvent<HTMLButtonElement, Element>,
    location: { rowIdx: number; columnIdx: number }
  ) => void;
  init: (
    rowIdx: number,
    columnIdx: number,
    ref: RefObject<HTMLButtonElement>
  ) => void;
}

export const formatValue = (value: string) => {
  switch (value) {
    case "-":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 448 512"
        >
          <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
        </svg>
      );
    case "*":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 320 512"
        >
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      );
    case "/":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 448 512"
        >
          <path d="M272 96c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 320c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM400 288c17.7 0 32-14.3 32-32s-14.3-32-32-32H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H400z" />
        </svg>
      );
    case "%":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 384 512"
        >
          <path d="M374.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-320 320c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l320-320zM128 128c0-35.3-28.7-64-64-64S0 92.7 0 128s28.7 64 64 64s64-28.7 64-64zM384 384c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64z" />
        </svg>
      );
    case "=":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 448 512"
        >
          <path d="M48 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48zm0 192c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48z" />
        </svg>
      );
    case "+":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      );
    case "FLIP_SIGN":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 384 512"
        >
          <path d="M224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H160V320c0 17.7 14.3 32 32 32s32-14.3 32-32V208H336c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V32zM0 480c0 17.7 14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z" />
        </svg>
      );
    case "DEL":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="h-5 w-5"
          viewBox="0 0 512 512"
        >
          <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z" />
        </svg>
      );
    default:
      return value;
  }
};

export const CalculatorButton: FC<Props> = ({
  value,
  onClick,
  pressedKeys,
  colored = false,
  bgColored = false,
  onFocus,
  location: { columnIdx, rowIdx },
  init,
}) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onClick(value);
  };
  const { isHighlighted } = useIsHighlighted({ value, pressedKeys });
  const ref = useRef<HTMLButtonElement>(null);

  const getColors = () => {
    if (isHighlighted) {
      return "bg-violet-400 text-white duration-none";
    } else if (bgColored) {
      return "text-violet-500 bg-violet-200 hover:bg-violet-400 hover:text-white duration-75";
    } else if (colored) {
      return "text-violet-500 hover:bg-violet-400 hover:text-white duration-75";
    } else {
      return "text-slate-900 hover:bg-violet-400 hover:text-white duration-75";
    }
  };

  const handleFocus: FocusEventHandler<HTMLButtonElement> = (e) => {
    onFocus(e, { rowIdx, columnIdx });
  };

  useEffect(() => {
    if (ref.current == null) return;
    init(rowIdx, columnIdx, ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return (
    <button
      ref={ref}
      onFocus={handleFocus}
      onClick={handleClick}
      className={`flex items-center justify-center rounded-full p-3 text-2xl font-medium leading-none transition-colors ${getColors()}`}
    >
      {formatValue(value)}
    </button>
  );
};

CalculatorButton.displayName = "CalculatorButton";

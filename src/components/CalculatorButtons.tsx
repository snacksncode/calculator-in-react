import { CalculatorButton } from "@/components/CalculatorButton";
import { FocusEvent, RefObject } from "react";

interface Props {
  afterClick: (value: string) => void;
  pressedKeys: string[];
  layout: string[][];
  onButtonFocus: (
    e: FocusEvent<HTMLButtonElement, Element>,
    location: { rowIdx: number; columnIdx: number }
  ) => void;
  initButton: (
    rowIdx: number,
    columnIdx: number,
    ref: RefObject<HTMLButtonElement>
  ) => void;
}

export const CalculatorButtons = ({
  afterClick,
  pressedKeys,
  layout,
  initButton,
  onButtonFocus,
}: Props) => {
  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-2 rounded-t-3xl bg-slate-50 p-5">
      {layout.map((row, rowIdx) => {
        return row.map((_, columnIdx) => {
          const key = layout[rowIdx][columnIdx];
          const cleanKey = key.replaceAll(/(\{|\}|\[|\])/g, "");
          const isColored = key.replaceAll(/(\{|\})/g, "") !== key;
          const isBgColored = key.replaceAll(/(\[|\])/g, "") !== key;
          return (
            <CalculatorButton
              key={`${key}_${rowIdx}_${columnIdx}`}
              onClick={afterClick}
              pressedKeys={pressedKeys}
              value={cleanKey}
              onFocus={onButtonFocus}
              bgColored={isBgColored}
              colored={isColored}
              location={{ rowIdx, columnIdx }}
              init={initButton}
            />
          );
        });
      })}
    </div>
  );
};

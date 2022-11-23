import { CalculatorButton } from "@/components/CalculatorButton";

interface Props {
  afterClick: (value: string) => void;
  pressedKeys: string[];
}

// {} - colored
// [] - bgColored
const layout = [
  ["AC", "FLIP_SIGN", "%", "/"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["{DEL}", "0", ".", "[=]"],
];

export const CalculatorButtons = ({ afterClick, pressedKeys }: Props) => {
  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-2 rounded-t-3xl bg-slate-50 p-5">
      {layout.flat().map((key) => {
        const cleanKey = key.replaceAll(/(\{|\}|\[|\])/g, "");
        const isColored = key.replaceAll(/(\{|\})/g, "") !== key;
        const isBgColored = key.replaceAll(/(\[|\])/g, "") !== key;
        return (
          <CalculatorButton
            key={key}
            afterClick={afterClick}
            pressedKeys={pressedKeys}
            value={cleanKey}
            bgColored={isBgColored}
            colored={isColored}
          />
        );
      })}
    </div>
  );
};

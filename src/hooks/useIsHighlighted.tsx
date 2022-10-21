import { useState, useEffect } from "react";

interface Props {
  value: string;
  pressedKeys: string[];
}

export const useIsHighlighted = ({ value, pressedKeys }: Props) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const shouldHighlight = pressedKeys.includes(value);
    if (!shouldHighlight) return;
    setIsHighlighted(true);
  }, [pressedKeys, value]);

  useEffect(() => {
    if (!pressedKeys.includes(value)) {
      setIsHighlighted(false);
    }
  }, [pressedKeys, value]);
  return { isHighlighted };
};

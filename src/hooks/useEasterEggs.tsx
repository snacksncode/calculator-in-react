import { useState } from "react";
import { GREEN_TRIGGER, SECRET_STRING_TRIGGER } from "../constants/easter-eggs";

export enum EasterEggs {
  SECRET_STRING,
  GREEN,
  NONE,
}

interface Props {
  value: string | null;
}

export const useEasterEggs = ({ value }: Props) => {
  const [easterEgg, setEasterEgg] = useState(EasterEggs.NONE);
  const reset = () => setEasterEgg(EasterEggs.NONE);
  const checkForEasterEgg = () => {
    switch (value) {
      case SECRET_STRING_TRIGGER: {
        setEasterEgg(EasterEggs.SECRET_STRING);
        return true;
      }
      case GREEN_TRIGGER: {
        setEasterEgg(EasterEggs.GREEN);
        return true;
      }
      default: {
        return false;
      }
    }
  };
  return { easterEgg, checkForEasterEgg, reset };
};

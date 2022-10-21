import { FC, PropsWithChildren, useLayoutEffect, useRef } from "react";
import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";

interface Props {
  theme: "light" | "dark";
  className?: string;
}

export const ScrollBlock: FC<PropsWithChildren<Props>> = ({ children, className, theme }) => {
  const ref = useRef<HTMLDivElement>(null);
  const valueContainer = ref.current?.querySelector("div");

  useLayoutEffect(() => {
    if (valueContainer == null) return;
    valueContainer.scrollIntoView({ inline: "end" });
  });

  return (
    <ScrollAreaRadix.Root type="always" className={className}>
      <ScrollAreaRadix.Viewport ref={ref}>{children}</ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar className="flex h-2 p-[2px] mx-1 mb-1" orientation="horizontal">
        <ScrollAreaRadix.Thumb
          className={`h-3 ${theme === "light" ? "bg-white" : "bg-neutral-600"} opacity-75 rounded-full`}
        />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Corner />
    </ScrollAreaRadix.Root>
  );
};

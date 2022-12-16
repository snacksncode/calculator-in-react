import { FC, PropsWithChildren } from "react";
import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";
import type { ScrollAreaScrollbarProps } from "@radix-ui/react-scroll-area";

interface Props {
  theme: "light" | "dark";
  className?: string;
  orientation?: ScrollAreaScrollbarProps["orientation"];
  forceChildAlignEnd?: boolean;
}

export const ScrollBlock: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  theme,
  orientation = "horizontal",
  forceChildAlignEnd = false,
}) => {
  return (
    <ScrollAreaRadix.Root type="hover" className={className}>
      <ScrollAreaRadix.Viewport
        className={forceChildAlignEnd ? "flex flex-row items-end" : ""}
      >
        <div style={{ display: "block" }} className="min-w-full">
          {children}
        </div>
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Scrollbar
        className={`flex min-h-[4px] min-w-[4px]`}
        orientation={orientation}
      >
        <ScrollAreaRadix.Thumb
          className={`
          ${orientation === "horizontal" ? "" : "flex-1"}
          ${theme === "light" ? "bg-white" : "bg-neutral-600"}
          rounded-full opacity-75`}
        />
      </ScrollAreaRadix.Scrollbar>
      <ScrollAreaRadix.Corner />
    </ScrollAreaRadix.Root>
  );
};

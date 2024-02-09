import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HintProps {
  children: React.ReactNode;
  description: string;
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}
export const Hint: React.FC<HintProps> = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
}) => { 
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          className="text-xs max-w-[220px] break-words"
          sideOffset={sideOffset}
          side={side}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

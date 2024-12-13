// TooltipButton.tsx
import React from 'react';
import { TooltipContent, TooltipTrigger ,TooltipArrow, TooltipProvider, Tooltip} from '../ui/tooltip';
interface TooltipButtonProps {
  children: React.ReactNode; // The button element to be wrapped
  tooltipContent: string; // Content to show in the tooltip
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right'; // Optional side prop for tooltip positioning
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  children,
  tooltipContent,
  tooltipSide = 'bottom', // Default position for the tooltip
}) => {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent className='bg-[#464A4D] text-white text-[0.75rem] font-poppin' side={tooltipSide}>
        <p>{tooltipContent}</p>
        <TooltipArrow/>
      </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;

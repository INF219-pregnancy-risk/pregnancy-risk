import { cn } from "@/lib/utils";
import React from "react";

interface SurveyContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const SurveyContainer = ({
  children,
  index,
  className,
  ...props
}: SurveyContainerProps) => {
  return (
    <div
      {...props}
      className={cn(
        "span-full text-foreground bg-background relative min-h-screen-nav",
        className
      )}
    >
      {children}
    </div>
  );
};

export default SurveyContainer;

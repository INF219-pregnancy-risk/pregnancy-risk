import React from "react";

interface SurveyContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const SurveyContainer = ({ children, index }: SurveyContainerProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-blue-200 relative">
      {children}
    </div>
  );
};

export default SurveyContainer;

import { Progress } from "@/components/ui/progress";
import React from "react";

/**
 * Props for the ProgressSurvey component.
 */
export interface PorgressSurveyProps {
  className?: string;
  currentSlide: number;
  totalSlides: number;
}

/**
 * A component that displays the progress of a survey.
 * @param {PorgressSurveyProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const ProgressSurvey = ({
  className,
  currentSlide,
  totalSlides,
}: PorgressSurveyProps) => {
  return <Progress value={(currentSlide / totalSlides) * 100} />;
};

export default ProgressSurvey;

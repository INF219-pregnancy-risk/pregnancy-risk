
import React from "react";
import { Progress } from "@/components/ui/progress"
export interface PorgressSurveyProps {
    className?: string;
    currentSlide: number;
    totalSlides: number;
    }

const ProgressSurvey = ({className, currentSlide, totalSlides}: PorgressSurveyProps) => {
    return (
        <Progress value={currentSlide/totalSlides * 100} />
    )
}
export default ProgressSurvey
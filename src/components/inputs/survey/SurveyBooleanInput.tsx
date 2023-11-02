import SurveyButton from "../buttons/SurveyButton";
import { SurveyInputSlideProps } from "./SurveyParseInput";
import { ID } from "@/types/RiskInput";
import { Survey, SurveyBoolean } from "@/types/Survey";
import React, { useEffect } from "react";

interface SurveyBooleanInputProps extends SurveyInputSlideProps {}

const SurveyBooleanInput = ({
  questionID,
  setSurvey,
  nextSlide,
  survey,
  setNextButton,
}: SurveyBooleanInputProps) => {
  const surveyData = survey?.data[questionID] as SurveyBoolean;

  // disable next button if input is not answered
  useEffect(() => {
    if (surveyData !== undefined || survey?.skipped.includes(questionID)) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [surveyData, setNextButton]);
  // handle change
  const handleChange = (bool: boolean) => {
    setSurvey((prev) => {
      const isSkipped = prev?.skipped.includes(questionID);

      return prev
        ? {
            data: {
              ...prev.data,
              [questionID]: bool,
            },
            skipped: isSkipped
              ? prev.skipped.filter((id) => id !== questionID)
              : prev.skipped,
          }
        : prev;
    });
    nextSlide();
  };

  return (
    <div className="flex gap-6">
      <SurveyButton
        checked={surveyData === true}
        size={"lg"}
        onClick={() => {
          handleChange(true);
        }}
      >
        YES
      </SurveyButton>
      <SurveyButton
        checked={surveyData === false}
        size={"lg"}
        variant={"secondary"}
        onClick={() => {
          handleChange(false);
        }}
      >
        NO
      </SurveyButton>
    </div>
  );
};

export default SurveyBooleanInput;

/**
 * Renders a boolean input for a survey question.
 *
 * @component
 * @param {SurveyBooleanInputProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
import SurveyButton from "../buttons/SurveyButton";
import { SurveyInputSlideProps } from "./SurveyParseInput";
import { SurveyBoolean } from "@/types/Survey";
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
            ...prev,
            data: {
              ...prev.data,
              [questionID]: bool,
            },
            skipped: isSkipped
              ? prev.skipped.filter((id) => id !== questionID)
              : prev.skipped,
            metadata: {
              ...prev.metadata,
              finished: false,
            },
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

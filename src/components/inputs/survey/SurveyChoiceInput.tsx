/**
 * Renders a survey choice input component.
 *
 * @component
 * @param {SurveyInputSlideProps} props - The props for the component.
 * @returns {JSX.Element} The rendered SurveyChoiceInput component.
 */
import SurveyButton from "../buttons/SurveyButton";
import { SurveyInputSlideProps } from "./SurveyParseInput";
import { RiskInputChoice, SurveyQuestions } from "@/types/RiskInput";
import { SurveyChoice } from "@/types/Survey";
import React, { useEffect } from "react";

interface SurveyChoiceInputProps extends SurveyInputSlideProps {}

const SurveyChoiceInput = ({
  questionID,
  setSurvey,
  nextSlide,
  survey,
  setNextButton,
}: SurveyChoiceInputProps) => {
  const surveyData = survey?.data[questionID] as SurveyChoice;
  const input = SurveyQuestions[questionID] as RiskInputChoice;

  useEffect(() => {
    if (!surveyData && !survey?.skipped.includes(questionID)) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }, [surveyData, setNextButton]);

  const handleChange = (option: string) => {
    // if the option is already selected, unselect it
    if (surveyData === option) {
      setSurvey((prev) => {
        if (!prev) return prev;
        const data = prev.data;
        delete data[questionID];
        return {
          ...prev,
          data: {
            ...data,
          },
          metadata: {
            ...prev.metadata,
            finished: false,
          },
        };
      });
      return;
    }

    setSurvey((prev) => {
      const isSkipped = prev?.skipped.includes(questionID);

      return prev
        ? {
            ...prev,
            data: {
              ...prev.data,
              [questionID]: option,
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
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {Object.entries(input.options).map(([option, value]) => {
        return (
          <SurveyButton
            id={option}
            key={option}
            checked={surveyData === option}
            size={"lg"}
            onClick={() => handleChange(option)}
          >
            {value}
          </SurveyButton>
        );
      })}
    </div>
  );
};
export default SurveyChoiceInput;

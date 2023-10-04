import React, { useEffect } from "react";
import { RiskInputChoice, Survey, SurveyBoolean, SurveyChoice } from "@/types/RiskInput";
import SurveyButton from "../buttons/SurveyButton";

interface SurveyChoiceInputProps {
  input: RiskInputChoice;
  nextSlide: () => void;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyChoiceInput = ({
  input,
  setSurvey,
  nextSlide,
  survey,
  setNextButton,
}: SurveyChoiceInputProps) => {
  const surveyData = survey.data[input.id] as SurveyChoice;

  if (surveyData) {
    setNextButton(true);
  }

  return (
    <div className="w-full flex flex-wrap gap-4 items-center justify-center">
      {Object.entries(input.options).map(([option, value]) => {
        return (
          <SurveyButton
            id={option}
            key={option}
            checked={surveyData === option}
            className="bg-blue-400 hover:bg-blue-500 duration-200 active:bg-blue-400 active:scale-95"
            onClick={() => {
              setSurvey((prev) => ({
                ...prev,
                data: {
                  ...prev.data,
                  [input.id]: option,
                },
              }));
            }}
          >
            {value}
          </SurveyButton>
        );
      })}
    </div>
  );
};
export default SurveyChoiceInput;

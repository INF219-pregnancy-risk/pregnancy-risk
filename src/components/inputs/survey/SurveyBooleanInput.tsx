import React, { use, useEffect } from "react";
import { RiskInputBoolean, Survey, SurveyBoolean } from "@/types/RiskInput";
import SurveyButton from "../buttons/SurveyButton";

interface SurveyBooleanInputProps {
  input: RiskInputBoolean;
  nextSlide: () => void;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyBooleanInput = ({
  input,
  setSurvey,
  nextSlide,
  survey,
  setNextButton,
}: SurveyBooleanInputProps) => {
  const surveyData = survey.data[input.id] as SurveyBoolean;

  if (surveyData === false || surveyData === true) {
    setNextButton(true);
  }

  const handleChange = (bool: boolean) => {
    setSurvey((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [input.id]: bool as SurveyBoolean,
      },
    }));
  };

  return (
    <div className="flex gap-6">
      <SurveyButton
        checked={surveyData === true}
        className="bg-blue-400 hover:bg-blue-500 duration-200"
        onClick={() => {
          handleChange(true);
        }}
      >
        YES
      </SurveyButton>
      <SurveyButton
        checked={surveyData === false}
        className="bg-gray-300 hover:bg-gray-400 duration-200"
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

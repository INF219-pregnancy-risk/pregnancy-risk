import React, { useEffect } from "react";
import { INPUT, Survey, SurveyBoolean } from "@/types/RiskInput";
import SurveyButton from "../buttons/SurveyButton";

interface SurveyBooleanInputProps {
  questionID: INPUT;
  nextSlide: () => void;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyBooleanInput = ({
  questionID,
  setSurvey,
  nextSlide,
  survey,
  setNextButton,
}: SurveyBooleanInputProps) => {
  const surveyData = survey.data[questionID] as SurveyBoolean;

  // disable next button if input is not answered
  useEffect(() => {
    if (surveyData !== undefined) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [surveyData, setNextButton]);

  // handle change
  const handleChange = (bool: boolean) => {
    setSurvey((prev) => {
      return {
        ...prev,
        data: {
          ...prev.data,
          [questionID]: bool,
        },
      };
    });
  };

  return (
    <div className="flex gap-6">
      <SurveyButton
        checked={surveyData === true}
        className="bg-blue-400 hover:bg-blue-500 duration-200 active:bg-blue-400 active:scale-95"
        onClick={() => {
          handleChange(true);
        }}
      >
        YES
      </SurveyButton>
      <SurveyButton
        checked={surveyData === false}
        className="bg-gray-300 hover:bg-gray-400 duration-200 active:bg-gray-300 active:scale-95"
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

import React, { useEffect } from "react";
import {
  INPUT,
  RiskInputChoice,
  Survey,
  SurveyChoice,
  SurveyQuestions,
} from "@/types/RiskInput";
import SurveyButton from "../buttons/SurveyButton";

interface SurveyChoiceInputProps {
  questionID: INPUT;
  nextSlide: () => void;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyChoiceInput = ({
  questionID,
  setSurvey,
  nextSlide,
  survey,
  setNextButton,
}: SurveyChoiceInputProps) => {
  const surveyData = survey.data[questionID] as SurveyChoice;
  const input = SurveyQuestions[questionID] as RiskInputChoice;

  useEffect(() => {
    if (!surveyData) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }, [surveyData, setNextButton]);

  const handleChange = (option: string) => {
    // if the option is already selected, unselect it
    if (surveyData === option) {
      setSurvey((prev) => {
        const data = prev.data;
        delete data[questionID];
        return {
          ...prev,
          data: {
            ...data,
          },
        };
      });
      return;
    }

    setSurvey((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [questionID]: option,
      },
    }));
  };

  return (
    <div className="w-full flex flex-wrap gap-4 items-center justify-center">
      {Object.entries(input.options).map(([option, value]) => {
        return (
          <SurveyButton
            id={option}
            key={option}
            checked={surveyData === option}
            className="bg-blue-400 hover:bg-blue-500 duration-200 active:bg-blue-400 active:scale-95"
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

import React, { useEffect } from "react";
import { ID, RiskInputMultiple, SurveyQuestions } from "@/types/RiskInput";
import SurveyButton from "../buttons/SurveyButton";
import { Survey, SurveyMultiple } from "@/types/Survey";

interface SurveyMultipleInputProps {
  questionID: ID;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyMultipleInput = ({
  questionID,
  setSurvey,
  survey,
  setNextButton,
}: SurveyMultipleInputProps) => {
  const surveyData = survey.data[questionID] as SurveyMultiple;
  const input = SurveyQuestions[questionID] as RiskInputMultiple;

  useEffect(() => {
    if (!surveyData) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }, [surveyData, setNextButton]);

  useEffect(() => {
    if (!surveyData) {
      let data: SurveyMultiple = {};

      Object.entries(input.values).map(([option, value]) => {
        data[option] = false;
      });

      setSurvey((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [questionID]: data,
        },
      }));
    }
  }, []);

  return (
    <div className="flex gap-4">
      {Object.entries(input.values).map(([option, value]) => {
        return (
          <SurveyButton
            id={option}
            key={option}
            checked={surveyData ? surveyData[option] : false}
            className="bg-blue-400 hover:bg-blue-500 duration-200 active:bg-blue-400 active:scale-95"
            onClick={() => {
              setSurvey((prev) => {
                const last = prev.data[questionID] as SurveyMultiple;
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    [questionID]: {
                      ...last,
                      [option]: !last[option],
                    },
                  },
                };
              });
            }}
          >
            {value}
          </SurveyButton>
        );
      })}
    </div>
  );
};

export default SurveyMultipleInput;

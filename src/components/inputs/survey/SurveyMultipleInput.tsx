import React, { use, useEffect } from "react";
import { RiskInputMultiple, Survey, SurveyMultiple } from "@/types/RiskInput";
import SurveyButton from "../buttons/SurveyButton";

interface SurveyMultipleInputProps {
  input: RiskInputMultiple;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyMultipleInput = ({
  input,
  setSurvey,
  survey,
  setNextButton,
}: SurveyMultipleInputProps) => {
  const surveyData: SurveyMultiple = survey.data[input.id] as SurveyMultiple;

  setNextButton(true);

  useEffect(() => {
    if (!surveyData) {
      let newData: SurveyMultiple = {};
      Object.entries(input.values).forEach(([option, value]) => {
        newData[option] = false;
      });
      setSurvey((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [input.id]: newData,
        },
      }));
    }
  }, [surveyData]);

  return (
    <div className="flex gap-4">
      {Object.entries(input.values).map(([option, value]) => {
        return (
          <SurveyButton
            id={option}
            checked={surveyData ? surveyData[option] : false}
            className="bg-blue-400 hover:bg-blue-500 duration-200"
            onClick={() => {
              setSurvey((prev) => ({
                ...prev,
                data: {
                  ...prev.data,
                  [input.id]: {
                    ...surveyData,
                    [option]: surveyData ? !surveyData[option] : true,
                  },
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

export default SurveyMultipleInput;

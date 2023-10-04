import React, { use, useEffect } from "react";
import { RiskInputMultiple, Survey, SurveyBoolean, SurveyMultiple } from "@/types/RiskInput";
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

  const surveyData = survey.data[input.id] as SurveyMultiple;

  setNextButton(true);

  useEffect(() => {
    if (!surveyData) {
      let data: SurveyMultiple = {};

      Object.entries(input.values).map(([option, value]) => {
        data[option] = false;
      }
      );

      setSurvey((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [input.id]: data,
        },
      }));

    }
  }, []
  );


  return (
    <div className="flex gap-4">
      {Object.entries(input.values).map(([option, value]) => {
        return (
          <SurveyButton
            id={option}
            key={option}
            checked={surveyData ? surveyData[option] : false }
            className="bg-blue-400 hover:bg-blue-500 duration-200 active:bg-blue-400 active:scale-95"
            onClick={() => {
              
              setSurvey((prev) => {
                const last = prev.data[input.id] as SurveyMultiple;
                return {
                  ...prev,
                  data: {
                    ...prev.data,
                    [input.id]: {
                      ...last,
                      [option]: !last[option],
                    },
                  },
                };
              });
            }
            }
          >
            {value}
          </SurveyButton>
        );
      })}
    </div>
  );
};

export default SurveyMultipleInput;

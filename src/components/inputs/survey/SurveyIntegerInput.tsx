import React, { use, useEffect } from "react";
import { ID, RiskInputInteger, SurveyQuestions } from "@/types/RiskInput";
import { Survey, SurveyInteger } from "@/types/Survey";

interface SurveyIntegerInputProps {
  questionID: ID;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyIntegerInput = ({
  questionID,
  setSurvey,
  survey,
  setNextButton,
}: SurveyIntegerInputProps) => {
  const surveyData = survey.data[questionID] as SurveyInteger;
  const input = SurveyQuestions[questionID] as RiskInputInteger;

  // disable next button if input is NaN
  useEffect(() => {
    if (isNaN(surveyData)) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }, [surveyData, setNextButton]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // only allow numbers
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      let value = parseInt(e.target.value);

      // set min and max if they exist
      if (input.min) {
        if (value < input.min) {
          value = input.min;
        }
      }

      if (input.max) {
        if (value > input.max) {
          value = input.max;
        }
      }

      // if value is NaN, remove the question from the survey
      if (isNaN(value)) {
        setSurvey((prev) => {
          const data = prev.data;
          delete data[questionID];
          return {
            ...prev,
            data: data,
          };
        });
        return;
      }
      // otherwise, set the value
      setSurvey((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [questionID]: value,
        },
      }));
    }
  };

  return (
    <div>
      <input
        type="text"
        className="border-2 border-gray-200 rounded-lg p-2"
        value={!isNaN(surveyData) ? surveyData : ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default SurveyIntegerInput;

import React from "react";
import { RiskInputInteger, Survey, SurveyInteger } from "@/types/RiskInput";

interface SurveyIntegerInputProps {
  input: RiskInputInteger;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyIntegerInput = ({
  input,
  setSurvey,
  survey,
  setNextButton,
}: SurveyIntegerInputProps) => {

  const surveyData = survey.data[input.id] as SurveyInteger;

  if (surveyData) {
    setNextButton(true);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // only allow numbers
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSurvey((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [input.id]: parseInt(e.target.value),
        },
      }));
    }
  };

  return (
    <div>
      <input
        type="text"
        className="border-2 border-gray-200 rounded-lg p-2"
        min={input?.min ? input.min : 0}
        max={input?.max ? input.max : 9999999999999}
        value={surveyData ? surveyData : ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default SurveyIntegerInput;

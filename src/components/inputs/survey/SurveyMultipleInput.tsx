import SurveyButton from "../buttons/SurveyButton";
import { SurveyInputSlideProps } from "./SurveyParseInput";
import { ID, RiskInputMultiple, SurveyQuestions } from "@/types/RiskInput";
import { Survey, SurveyMultiple } from "@/types/Survey";
import React, { useEffect } from "react";

interface SurveyMultipleInputProps extends SurveyInputSlideProps {}

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
    <div className="flex gap-4 flex-wrap items-center justify-center">
      {Object.entries(input.values).map(([option, value]) => {
        return (
          <SurveyButton
            id={option}
            key={option}
            checked={surveyData ? surveyData[option] : false}
            size={"lg"}
            onClick={() => {
              setSurvey((prev) => {
                const last = prev.data[questionID] as SurveyMultiple;
                const isSkipped = prev.skipped.includes(questionID);
                return {
                  data: {
                    ...prev.data,
                    [questionID]: {
                      ...last,
                      [option]: last ? !last[option] : true,
                    },
                  },
                  skipped: isSkipped
                    ? prev.skipped.filter((id) => id !== questionID)
                    : prev.skipped,
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

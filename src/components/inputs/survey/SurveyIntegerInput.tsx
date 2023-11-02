import SurveyButton from "../buttons/SurveyButton";
import { SurveyInputSlideProps } from "./SurveyParseInput";
import { ID, RiskInputInteger, SurveyQuestions } from "@/types/RiskInput";
import { Survey, SurveyInteger } from "@/types/Survey";
import React, { useRef, useEffect, LegacyRef, MutableRefObject } from "react";

interface SurveyIntegerInputProps extends SurveyInputSlideProps {}

const SurveyIntegerInput = ({
  questionID,
  setSurvey,
  survey,
  nextSlide,
  setNextButton,
}: SurveyIntegerInputProps) => {
  const surveyData = survey?.data[questionID] as SurveyInteger;
  const input = SurveyQuestions[questionID] as RiskInputInteger;

  const inputRef = useRef<HTMLInputElement>(null);
  // disable next button if input is NaN
  useEffect(() => {
    if (isNaN(surveyData)) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }, [surveyData, setNextButton]);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

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
          if (!prev) return;
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
      setSurvey((prev) =>
        prev
          ? {
              ...prev,
              data: {
                ...prev.data,
                [questionID]: value,
              },
            }
          : prev
      );
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <input
        type="text"
        inputMode="numeric"
        className="border-2 rounded-lg p-2"
        value={!isNaN(surveyData) ? surveyData : ""}
        onChange={handleChange}
        ref={inputRef}
      />
      <SurveyButton
        onClick={() => {
          if (survey?.skipped.includes(questionID)) {
            setSurvey((prev) =>
              prev
                ? {
                    ...prev,
                    skipped: prev.skipped.filter((id) => id !== questionID),
                  }
                : prev
            );
          }
          nextSlide();
        }}
        disabled={isNaN(surveyData)}
      >
        OK
      </SurveyButton>
    </div>
  );
};

export default SurveyIntegerInput;

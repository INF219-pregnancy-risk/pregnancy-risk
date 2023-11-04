import SurveyButton from "../buttons/SurveyButton";
import { SurveyInputSlideProps } from "./SurveyParseInput";
import { ID, RiskInputInteger, SurveyQuestions } from "@/types/RiskInput";
import { Survey, SurveyInteger } from "@/types/Survey";
import React, { useState, useRef, useEffect, LegacyRef, MutableRefObject } from "react";
import { poundsToKilograms, feetToCentimeters } from '@/utils/Conversion';


interface SurveyIntegerInputProps extends SurveyInputSlideProps { }

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

  // New piece of state for the display value
  const [displayValue, setDisplayValue] = useState('');

  // disable next button if input is NaN
  useEffect(() => {
    if (isNaN(surveyData) && !survey?.skipped.includes(questionID)) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }, [surveyData, setNextButton]);

  useEffect(() => {
    if (isNaN(surveyData) && !survey?.skipped.includes(questionID)) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the display value directly with the user input
    setDisplayValue(e.target.value);

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
          if (!prev) return prev;
          const data = prev.data;
          delete data[questionID];
          return {
            ...prev,
            data: data,
            metadata: {
              ...prev.metadata,
              finished: false,
            },
          };
        });
        return;
      }

      // Add conversion logic before setting the survey data
      let convertedValue = value;
      console.log(convertedValue);
      // Fetch the measurement system preference from the survey data
      const measurementSystem = survey?.data.MEASURING; // Assuming 'MEASURING' is the key for the measurement system preference

      // Check if the current question needs conversion
      if (measurementSystem === 'IMPERIAL') {
        if (questionID === ID.WEIGHT) {
          // Assuming 'value' is in pounds, convert to kilograms
          convertedValue = poundsToKilograms(value);
        } else if (questionID === ID.HEIGHT) {
          // Assuming 'value' is in feet, convert to centimeters
          // Note: This is a simplified example. You might need to handle feet and inches separately
          convertedValue = feetToCentimeters(value);
        }
      }

      console.log("After conv " + convertedValue);
      // otherwise, set the value
      setSurvey((prev) =>
        prev
          ? {
            ...prev,
            data: {
              ...prev.data,
              [questionID]: convertedValue,
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
        // value={!isNaN(surveyData) ? surveyData : ""}
        value={displayValue} // Use displayValue here
        onChange={handleChange}
        ref={inputRef}
        placeholder={input.placeholder || "Enter value"}
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

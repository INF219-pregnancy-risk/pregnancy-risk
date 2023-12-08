/**
 * Renders an input component for survey questions that require integer values.
 * @param {SurveyIntegerInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
import SurveyButton from "../buttons/SurveyButton";
import { SurveyInputSlideProps } from "./SurveyParseInput";
import { ID, RiskInputInteger, SurveyQuestions } from "@/types/RiskInput";
import { SurveyInteger } from "@/types/Survey";
import React, { useState, useRef, useEffect } from "react";

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
  const measurementSystem = survey?.data.MEASURING;
  const [placeholderText, setPlaceholderText] = useState(input.placeholder);

  const inputRef = useRef<HTMLInputElement>(null);

  // New piece of state for the display value since it will change when imperial is selected
  // const [displayValue, setDisplayValue] = useState('');

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
  useEffect(() => {
    if (measurementSystem === "IMPERIAL") {
      if (questionID === ID.WEIGHT) {
        setPlaceholderText("Enter in lbs");
      } else if (questionID === ID.HEIGHT) {
        setPlaceholderText("Enter in feet and inches");
      }
    } else {
      // Set to default placeholder when not imperial
      setPlaceholderText(input.placeholder);
    }
  }, [survey?.data.MEASURING, questionID, input.placeholder]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the display value directly with the user input
    // setDisplayValue(e.target.value);

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
      // let convertedValue = value;
      // const measurementSystem = survey?.data.MEASURING;
      // Use getPlaceholderText function inside the component

      // Check if the current question needs conversion
      // if (measurementSystem === 'IMPERIAL') {
      //   console.log(convertedValue);
      //   if (questionID === ID.WEIGHT) {
      //     convertedValue = poundsToKilograms(value);
      //     placeholderText = "Enter in lbs";
      //     console.log(placeholderText);
      //     console.log(value + " lbs to kg: " + convertedValue);
      //   } else if (questionID === ID.HEIGHT) {
      //     // Note: Feet and inches should have seperate inputs and this is not done so skip
      //     // question for now while testing
      //     convertedValue = feetToCentimeters(value);
      //   }
      // }

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
        // value={displayValue} // Use displayValue here
        onChange={handleChange}
        ref={inputRef}
        placeholder={placeholderText || "Enter value"}
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

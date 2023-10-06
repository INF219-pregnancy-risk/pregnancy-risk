"use client";

import React, { useState } from "react";
import { TYPE, ID, SurveyQuestions, RiskType } from "@/types/RiskInput";

import SurveyIntegerInput from "./SurveyIntegerInput";
import SurveyBooleanInput from "./SurveyBooleanInput";
import SurveyMultipleInput from "./SurveyMultipleInput";
import SurveyChoiceInput from "./SurveyChoiceInput";
import { Survey } from "@/types/Survey";

interface SurveyInputSlideProps<T> {
  questionID: ID;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  nextSlide: () => void;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
  showSubQuestions: boolean;
  handleValueChange?: (newValue: T) => void;
}

const SurveyParseInput = <T,>({
  questionID,
  showSubQuestions,
  ...props
}: SurveyInputSlideProps<T>) => {
  const input = SurveyQuestions[questionID];
  const [currentValue, setCurrentValue] = useState<T | null>(null); // you might want to change any to a more specific type

  // Function to handle value changes
  const handleValueChange = (newValue: T) => {
    setCurrentValue(newValue);
  };

  if (!input) {
    return <div>Error parsing: Input</div>;
  }

  return (
    <>
      <div>
        <h1 className="font-semibold text-2xl">{input.label}</h1>
        <i className="text-base text-gray-500">{getInfo(questionID)}</i>
      </div>

      <Parser
        {...props}
        showSubQuestions={false}
        questionID={questionID}
        handleValueChange={handleValueChange}
      />
      {showSubQuestions &&
        input.subquestions &&
        input.subquestions.length > 0 && (
          <div>
            {input.subquestions.map((subQuestion, index) => {
              if (subQuestion.input[subQuestion.id]?.label) {
                return (
                  <div key={index}>
                    <label>{subQuestion.input[subQuestion.id]?.label}</label>
                    <Parser
                      showSubQuestions={false}
                      {...props}
                      questionID={subQuestion.id}
                    />
                  </div>
                );
              } else {
                return <div key={index}>Invalid subQuestion format</div>;
              }
            })}
          </div>
        )}
    </>
  );
};

const Parser = <T,>({
  setSurvey,
  survey,
  setNextButton,
  nextSlide,
  questionID,
}: SurveyInputSlideProps<T>) => {
  switch (TYPE[questionID]) {
    case RiskType.INTEGER:
      return (
        <SurveyIntegerInput
          questionID={questionID}
          setSurvey={setSurvey}
          survey={survey}
          setNextButton={setNextButton}
        />
      );
    case RiskType.BOOLEAN:
      return (
        <SurveyBooleanInput
          questionID={questionID}
          nextSlide={nextSlide}
          setSurvey={setSurvey}
          survey={survey}
          setNextButton={setNextButton}
        />
      );
    case RiskType.MULTIPLE:
      return (
        <SurveyMultipleInput
          questionID={questionID}
          setSurvey={setSurvey}
          setNextButton={setNextButton}
          survey={survey}
        />
      );
    case RiskType.CHOICE:
      return (
        <SurveyChoiceInput
          questionID={questionID}
          setSurvey={setSurvey}
          nextSlide={nextSlide}
          setNextButton={setNextButton}
          survey={survey}
        />
      );
    default:
      return <div>Error parsing: Input</div>; // Handle unknown types
  }
};

const getInfo = (input: ID) => {
  switch (TYPE[input]) {
    case RiskType.BOOLEAN:
      return null;
    case RiskType.INTEGER:
      return "Choose one";
    case RiskType.MULTIPLE:
      return "Choose multiple";
    case RiskType.CHOICE:
      return "Input a number";
    default:
      return null;
  }
};

export default SurveyParseInput;

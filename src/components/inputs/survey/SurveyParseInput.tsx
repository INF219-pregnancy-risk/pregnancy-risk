"use client";

import React from "react";
import {
  RiskInputBoolean,
  RiskInputChoice,
  RiskInputInteger,
  RiskInputMultiple,
  RiskInputs,
  RiskType,
  Survey,
} from "@/types/RiskInput";

import SurveyIntegerInput from "./SurveyIntegerInput";
import SurveyBooleanInput from "./SurveyBooleanInput";
import SurveyMultipleInput from "./SurveyMultipleInput";
import SurveyChoiceInput from "./SurveyChoiceInput";

interface SurveyInputSlideProps {
  input: RiskInputs;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  nextSlide: () => void;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
  showSubQuestions: boolean;
}

const SurveyParseInput = ({
  input,
  showSubQuestions,
  ...props
}: SurveyInputSlideProps) => {
  return (
    <>
      <div>
        <h1 className="font-semibold text-2xl">{input.label}</h1>
        <i className="text-base text-gray-500">{getInfo(input)}</i>
      </div>

      <Parser showSubQuestions={false} {...props} input={input} />
      {showSubQuestions && input.condition && input.condition.length > 0 && (
        <div>
          {input.condition[0].subQuestions.map((subQuestion, index) => {
            if ("type" in subQuestion && "label" in subQuestion) {
              return (
                <div key={index}>
                  <label>{subQuestion.label}</label>
                  <Parser showSubQuestions={false} {...props} input={subQuestion as RiskInputs}
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

const Parser = ({
  input,
  setSurvey,
  survey,
  setNextButton,
  nextSlide,
}: SurveyInputSlideProps) => {
  switch (input.type) {
    case RiskType.INTEGER:
      const integerInput = input as RiskInputInteger; // Cast input to RiskInput
      return (
        <SurveyIntegerInput
          input={integerInput}
          setSurvey={setSurvey}
          survey={survey}
          setNextButton={setNextButton}
        />
      );
    case RiskType.BOOLEAN:
      const booleanInput = input as RiskInputBoolean; // Cast input to RiskInput
      return (
        <SurveyBooleanInput
          input={booleanInput}
          nextSlide={nextSlide}
          setSurvey={setSurvey}
          survey={survey}
          setNextButton={setNextButton}
        />
      );
    case RiskType.MULTIPLE:
      const multipleInput = input as RiskInputMultiple; // Cast input to RiskInputMultiple
      return (
        <SurveyMultipleInput
          input={multipleInput}
          setSurvey={setSurvey}
          setNextButton={setNextButton}
          survey={survey}
        />
      );
    case RiskType.CHOICE:
      const choiceInput = input as RiskInputChoice; // Cast input to RiskInputChoice
      return (
        <SurveyChoiceInput
          input={choiceInput}
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

const getInfo = (input: RiskInputs) => {
  switch (input.type) {
    case RiskType.BOOLEAN:
      return null;
    case RiskType.CHOICE:
      return "Choose one";
    case RiskType.MULTIPLE:
      return "Choose multiple";
    case RiskType.INTEGER:
      return "Input a number";
    default:
      return null;
  }
};

export default SurveyParseInput;

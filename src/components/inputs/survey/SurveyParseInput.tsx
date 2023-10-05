"use client";

import React from "react";
import { TYPE, ID, SurveyQuestions, RiskType } from "@/types/RiskInput";

import SurveyIntegerInput from "./SurveyIntegerInput";
import SurveyBooleanInput from "./SurveyBooleanInput";
import SurveyMultipleInput from "./SurveyMultipleInput";
import SurveyChoiceInput from "./SurveyChoiceInput";
import { Survey } from "@/types/Survey";

interface SurveyInputSlideProps {
  questionID: ID;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  survey: Survey;
  nextSlide: () => void;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyParseInput = ({ questionID, ...props }: SurveyInputSlideProps) => {
  const input = SurveyQuestions[questionID];

  if (!input) {
    return <div>Error parsing: Input</div>;
  }

  return (
    <>
      <div>
        <h1 className="font-semibold text-2xl">{input.label}</h1>
        <i className="text-base text-gray-500">{getInfo(questionID)}</i>
      </div>
      <Parser {...props} questionID={questionID} />
    </>
  );
};

const Parser = ({
  setSurvey,
  survey,
  setNextButton,
  nextSlide,
  questionID,
}: SurveyInputSlideProps) => {
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

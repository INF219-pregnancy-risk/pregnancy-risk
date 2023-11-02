"use client";

import AccordionSurvey from "../info/AccordionSurvey";
import SurveyBooleanInput from "./SurveyBooleanInput";
import SurveyChoiceInput from "./SurveyChoiceInput";
import SurveyIntegerInput from "./SurveyIntegerInput";
import SurveyMultipleInput from "./SurveyMultipleInput";
import { TYPE, ID, SurveyQuestions, RiskType } from "@/types/RiskInput";
import { Survey } from "@/types/Survey";
import React from "react";

export interface SurveyInputSlideProps {
  questionID: ID;
  setSurvey: React.Dispatch<React.SetStateAction<Survey | undefined>>;
  survey: Survey | undefined;
  nextSlide: () => void;
  setNextButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const SurveyParseInput = ({ questionID, ...props }: SurveyInputSlideProps) => {
  const input = SurveyQuestions[questionID];

  if (!input) {
    return <div>Error parsing: Input</div>;
  }

  return (
    <div className="h-full grid grid-cols-1 grid-rows-[1fr_auto_1fr] gap-8">
      <div className="w-full text-center self-end gap-4 flex flex-col items-center">
        <h1 className="font-semibold text-xl md:text-2xl">{input.label}</h1>
        <i className="text-base text-foreground flex">{getInfo(questionID)}</i>
      </div>
      <div className="w-full items-center justify-center flex">
        <Parser {...props} questionID={questionID} />
      </div>
      <div className="flex flex-col flex-1 items-center justify-end w-full place-self-start">
        <AccordionSurvey why={input.why} className="text-center w-full" />
      </div>
    </div>
  );
};

const Parser = ({ ...props }: SurveyInputSlideProps) => {
  switch (TYPE[props.questionID]) {
    case RiskType.INTEGER:
      return <SurveyIntegerInput {...props} />;
    case RiskType.BOOLEAN:
      return <SurveyBooleanInput {...props} />;
    case RiskType.MULTIPLE:
      return <SurveyMultipleInput {...props} />;
    case RiskType.CHOICE:
      return <SurveyChoiceInput {...props} />;
    default:
      return <div>Error parsing: Input</div>; // Handle unknown types
  }
};

const getInfo = (input: ID) => {
  switch (TYPE[input]) {
    case RiskType.BOOLEAN:
      return null;
    case RiskType.INTEGER:
      return "Input a number";
    case RiskType.MULTIPLE:
      return "Choose multiple";
    case RiskType.CHOICE:
      return "Choose one";
    default:
      return null;
  }
};

export default SurveyParseInput;

import { ID, RiskInput, SurveyQuestions } from "./RiskInput";

export type SurveyBoolean = boolean;

export type SurveyInteger = number;

export type SurveyMultiple = { [key: string]: boolean };

export type SurveyChoice = string;

export type SurveyData =
  | SurveyBoolean
  | SurveyInteger
  | SurveyMultiple
  | SurveyChoice;

export interface Survey {
  data: {
    [key in ID]?: SurveyData;
  };
  skipped: ID[];
}

export const SurveyEntries: [ID, RiskInput][] = Object.entries(
  SurveyQuestions
).map(([id, question]) => [id as ID, question]);

import { ID, RiskInput, RiskType, SurveyQuestions, TYPE } from "./RiskInput";

export type SurveyBoolean = boolean;

export type SurveyInteger = number;

export type SurveyMultiple = Record<string, boolean>;

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
  metadata: {
    [key: string]: any;
  };
}

type RiskTypeToFactor = {
  [RiskType.BOOLEAN]: SurveyBoolean;
  [RiskType.INTEGER]: SurveyInteger;
  [RiskType.CHOICE]: SurveyChoice;
  [RiskType.MULTIPLE]: SurveyMultiple;
};

export type MapIDToType<T extends ID> = RiskTypeToFactor[(typeof TYPE)[T]];

export const SurveyEntries: [ID, RiskInput][] = Object.entries(
  SurveyQuestions
).map(([id, question]) => [id as ID, question]);

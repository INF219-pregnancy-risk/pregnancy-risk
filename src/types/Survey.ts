import { ID, RiskInput, SurveyQuestions } from "./RiskInput";

export type SurveyBoolean = boolean;

export type SurveyInteger = number;

export type SurveyMultiple = { [key: string]: boolean };

export type SurveyChoice = string;

export type SurveySubQuestion = { [key: string]: SurveyBoolean };

export type SurveyData =
  | SurveyBoolean
  | SurveyInteger
  | SurveyMultiple
  | SurveyChoice
  | SurveySubQuestion;

  export interface Survey {
    data: {
      [key: string]: SurveyData | {
        value: SurveyData,
        subQuestions?: {
          [key: string]: SurveySubQuestion
        }
      };
    };
    skipped?: number[] | null;
  }

export const SurveyEntries: [ID, RiskInput<any>][] = Object.entries(
  SurveyQuestions
).map(([id, question]) => [id as ID, question]);

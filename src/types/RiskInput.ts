// types.ts

export enum RiskType {
  INTEGER = "integer",
  BOOLEAN = "boolean",
  MULTIPLE = "multiple",
  CHOICE = "choice",
  SUBQUESTION = "subquestion",
}

interface Condition<T> {
  triggerValue: (value: T) => boolean;
  subQuestions: RiskInputType<any>[];
}

export interface RiskInputType<T> {
  id: string;
  label: string;
  type: RiskType;
  condition?: Condition<T>[];
}

export interface RiskInputInteger extends RiskInputType<number> {
  type: RiskType.INTEGER;
  min?: number;
  max?: number;
  condition?: Condition<number>[];
}

export interface RiskInputBoolean extends RiskInputType<boolean> {
  type: RiskType.BOOLEAN;
  condition?: Condition<boolean>[];
}

export interface RiskInputMultiple extends RiskInputType<{ [key: string]: boolean }> {
  type: RiskType.MULTIPLE;
  values: { [key: string]: string };
  condition?: Condition<{ [key: string]: boolean }>[];
}

export interface RiskInputChoice extends RiskInputType<string> {
  type: RiskType.CHOICE;
  options: { [key: string]: string };
  condition?: Condition<string>[];
}

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

export type RiskInputs =
  | RiskInputInteger
  | RiskInputBoolean
  | RiskInputMultiple
  | RiskInputChoice;

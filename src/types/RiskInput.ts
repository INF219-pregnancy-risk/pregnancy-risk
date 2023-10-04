// types.ts

export enum RiskType {
  INTEGER = "integer",
  BOOLEAN = "boolean",
  MULTIPLE = "multiple",
  CHOICE = "choice",
  //SUBQUESTION = "subquestion",
}

export interface RiskInputType {
  id: string;
  label: string;
  type: RiskType;
  subQuestions?: RiskInputs[];
  condition?: ((value: any) => boolean) | boolean | null;
}



export interface RiskInputInteger extends RiskInputType {
  type: RiskType.INTEGER;
  min?: number;
  max?: number;
}

export interface RiskInputBoolean extends RiskInputType {
  type: RiskType.BOOLEAN;
  // condition?: RiskType.BOOLEAN;  // Add this for subquestions
}


export interface RiskInputMultiple extends RiskInputType {
  type: RiskType.MULTIPLE;
  values: { [key: string]: string };
}

export interface RiskInputChoice extends RiskInputType {
  type: RiskType.CHOICE;
  options: { [key: string]: string };
}

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
    [key: string]: SurveyData;
  };
  skipped?: number[] | null;
}

export type RiskInputs =
  | RiskInputInteger
  | RiskInputBoolean
  | RiskInputMultiple
  | RiskInputChoice;

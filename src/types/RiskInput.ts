// types.ts

export enum RiskType {
  INTEGER = "integer",
  BOOLEAN = "boolean",
  MULTIPLE = "multiple",
  CHOICE = "choice",
}

export interface RiskInput {
  label: string;
}

export interface RiskInputInteger extends RiskInput {
  min?: number;
  max?: number;
}

export interface RiskInputBoolean extends RiskInput {}

export interface RiskInputMultiple extends RiskInput {
  values: { [key: string]: string };
}

export interface RiskInputChoice extends RiskInput {
  options: { [key: string]: string };
}

type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

type InputIntegers = FilteredKeys<InputTypes, RiskType.INTEGER>;
type InputBooleans = FilteredKeys<InputTypes, RiskType.BOOLEAN>;
type InputMultiples = FilteredKeys<InputTypes, RiskType.MULTIPLE>;
type InputChoices = FilteredKeys<InputTypes, RiskType.CHOICE>;

type QuestionInputIntegers = {
  [key in InputIntegers]?: RiskInputInteger;
};

type QuestionInputBooleans = {
  [key in InputBooleans]?: RiskInputBoolean;
};

type QuestionInputMultiples = {
  [key in InputMultiples]?: RiskInputMultiple;
};

type QuestionInputChoices = {
  [key in InputChoices]?: RiskInputChoice;
};

type InputTypes = {
  [key in INPUT]: RiskType;
};

export enum INPUT {
  AGE = "AGE",
  WEIGHT = "WEIGHT",
  HEIGHT = "HEIGHT",
  DIABETES = "DIABETES",
  GDM = "GDM",
  PCOS = "PCOS",
  ACTIVITY = "ACTIVITY",
  ETNISITY = "ETNISITY",
  OTHER = "OTHER",
  TEST = "TEST",
}

export const InputType: InputTypes = {
  [INPUT.AGE]: RiskType.INTEGER,
  [INPUT.WEIGHT]: RiskType.INTEGER,
  [INPUT.HEIGHT]: RiskType.INTEGER,
  [INPUT.DIABETES]: RiskType.BOOLEAN,
  [INPUT.GDM]: RiskType.BOOLEAN,
  [INPUT.PCOS]: RiskType.BOOLEAN,
  [INPUT.ACTIVITY]: RiskType.MULTIPLE,
  [INPUT.ETNISITY]: RiskType.CHOICE,
  [INPUT.OTHER]: RiskType.BOOLEAN,
  [INPUT.TEST]: RiskType.BOOLEAN,
};

type QuestionInputs =
  | QuestionInputIntegers
  | QuestionInputBooleans
  | QuestionInputMultiples
  | QuestionInputChoices;

export const SurveyQuestions: { [key in INPUT]?: RiskInput } = {
  [INPUT.AGE]: {
    label: "What is your age?",
    min: 0,
    max: 100,
  },
  [INPUT.WEIGHT]: {
    label: "What is your age?",
  },
  [INPUT.ETNISITY]: {
    label: "What is your etnisity?",
    options: {
      white: "White",
      black: "Black",
      asian: "Asian",
      other: "Other",
    },
  },
  [INPUT.ACTIVITY]: {
    label: "What is your activity?",
    values: {
      walking: "Walking",
      running: "Running",
      swimming: "Swimming",
    },
  },
  [INPUT.GDM]: {
    label: "Have you had gestational diabetes?",
  },
} as QuestionInputs;

export const SurveyEntries = Object.entries(SurveyQuestions) as [
  INPUT,
  RiskInput
][];

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
    [key in INPUT]?: SurveyData;
  };
  skipped: INPUT[];
}

export interface Condition {
  name: string;
  description: string;
  refrences: number[];
  baseRisk: number;
}

export interface ConditionsType {
  [key: string]: Condition;
}

export interface Factor {
  id: string;
  multiplier: number;
}

export interface FactorBool extends Factor {
  type: RiskType.BOOLEAN;
  condition: (value: boolean) => boolean;
}

export interface FactorInteger extends Factor {
  type: RiskType.INTEGER;
  condition: (value: number) => boolean;
}

const Conditions: ConditionsType = {
  gdm: {
    name: "Gestational Diabetes Mellitus",
    description: `Gestational diabetes mellitus is defined as carbohydrate intolerance resulting in
    hyperglycaemia, including impaired glucose tolerance with first onset or detection
    during pregnancy and affects about 5-10% of pregnancies [7]]. Gestational diabetes
    increases the risk of complications for both mother and child during pregnancy,
    childbirth and beyond`,
    refrences: [8, 9, 10],
    baseRisk: 0.1,
  },
};

/*
  const Factors: ComplicationFactors = {
    gdm: [
      {
        id: "age",
        type: RiskType.INTEGER,
        condition: (value) => value > 30 && value <= 40, 
        multiplier: 3
      },
      {
        id: "age",
        type: RiskType.INTEGER,
        condition: (value) => value > 40, 
        multiplier: 5
      },
      {
        id: "diabetes",
        type: RiskType.BOOLEAN,
        condition: (value) => value === true,
        multiplier: 3
      }
    ]
  }
  */

/*
  Object.entries(Factors).map(([id, factors]) => {
    let risk = Conditions[id].baseRisk
    factors.map(factor => {
      if (factor.condition(survey.data[factor.id]))) {
        risk = risk * factor.multiplier
      }
    }
  });
  */

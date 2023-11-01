export enum RiskType {
  INTEGER = "INTEGER",
  BOOLEAN = "BOOLEAN",
  MULTIPLE = "MULTIPLE",
  CHOICE = "CHOICE",
}

type RiskInputTYPE<T extends ID> = {
  [RiskType.INTEGER]: RiskInputInteger;
  [RiskType.BOOLEAN]: RiskInputBoolean;
  [RiskType.MULTIPLE]: RiskInputMultiple;
  [RiskType.CHOICE]: RiskInputChoice;
};

export interface RiskInput {
  label: string;
  why?: string;
}
// Integer riskinput
export interface RiskInputInteger extends RiskInput {
  min?: number;
  max?: number;
}
// Multiple riskinput
export interface RiskInputMultiple extends RiskInput {
  values: Record<string, string>;
}
// Choice riskinput
export interface RiskInputChoice extends RiskInput {
  options: Record<string, string>;
}
// Boolean riskinput
export interface RiskInputBoolean extends RiskInput {}

const ID_DECLARATION = {
  AGE: RiskType.INTEGER,
  WEIGHT: RiskType.INTEGER,
  HEIGHT: RiskType.INTEGER,
  DIABETES: RiskType.BOOLEAN,
  HYPERTENSION: RiskType.CHOICE,
  ACTIVITY: RiskType.MULTIPLE,
  ETNISITY: RiskType.CHOICE,
  SLE_OR_APS: RiskType.BOOLEAN,
  GDM: RiskType.BOOLEAN,
  POS: RiskType.MULTIPLE,
  PPE: RiskType.BOOLEAN,
  T2DM: RiskType.BOOLEAN,
  SMOKING: RiskType.BOOLEAN,
  STRESS: RiskType.BOOLEAN,
  PREVIOUS_PRETERM: RiskType.BOOLEAN,
  CERVICAL_SURGERY: RiskType.BOOLEAN,
  MULTIPLE_GESTATIONS: RiskType.BOOLEAN,
  HEPATITIS_C: RiskType.BOOLEAN,
  ECLAMPSIA: RiskType.BOOLEAN,
  INFERILITY_TREATMENT: RiskType.BOOLEAN,
  GONORHEA_SYPHILIS: RiskType.BOOLEAN,
} as const;

export type ID = BOOLEANS | INTEGERS | MULTIPLES | CHOICES;

export const ID = Object.freeze(
  Object.keys(ID_DECLARATION).reduce(
    (acc, key) => ({ ...acc, [key]: key }),
    {}
  ) as { [key in ID]: key }
);

export const TYPE = ID_DECLARATION;

type SurveyQuestionsType = {
  [K in ID]?: RiskInputTYPE<K>[(typeof ID_DECLARATION)[K]];
};

export const SurveyQuestions: Readonly<SurveyQuestionsType> = {
  [ID.GDM]: {
    label: "Do you have a history of GDM?",
    why: "This is why its important",
  },
  [ID.AGE]: {
    label: "What is your age?",
  },
  [ID.WEIGHT]: {
    label: "What is your weight?",
  },
  [ID.HEIGHT]: {
    label: "What is your height?",
  },
  [ID.DIABETES]: {
    label: "Do you have diabetes?",
  },
  [ID.HYPERTENSION]: {
    label: "Do you have hypertension?",
    options: {
      CHRONIC: "Chronic",
      GESTATIONAL: "Gestational",
      NONE: "None",
    },
  },
  [ID.ACTIVITY]: {
    label: "Select your activity level:",
    values: {
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "High",
    },
  },
  [ID.ETNISITY]: {
    label: "Select your ethnicity:",
    options: {
      ASIAN: "Asian",
      BLACK: "Black",
      CAUCASIAN: "Caucasian",
      HISPANIC: "Hispanic",
      OTHER: "Other",
    },
  },
} as const;

export type BOOLEANS = {
  [key in keyof typeof ID_DECLARATION]: (typeof ID_DECLARATION)[key] extends RiskType.BOOLEAN
    ? key
    : never;
}[keyof typeof ID_DECLARATION];

export type INTEGERS = {
  [key in keyof typeof ID_DECLARATION]: (typeof ID_DECLARATION)[key] extends RiskType.INTEGER
    ? key
    : never;
}[keyof typeof ID_DECLARATION];

export type MULTIPLES = {
  [key in keyof typeof ID_DECLARATION]: (typeof ID_DECLARATION)[key] extends RiskType.MULTIPLE
    ? key
    : never;
}[keyof typeof ID_DECLARATION];

export type CHOICES = {
  [key in keyof typeof ID_DECLARATION]: (typeof ID_DECLARATION)[key] extends RiskType.CHOICE
    ? key
    : never;
}[keyof typeof ID_DECLARATION];

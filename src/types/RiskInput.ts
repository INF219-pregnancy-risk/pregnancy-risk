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
  number : number;
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

const ID_NAME_MAPPING = {
  AGE: "Age",
  WEIGHT: "Weight",
  HEIGHT: "Height",
  DIABETES: "Diabetes",
  HYPERTENSION: "Hypertension",
  ACTIVITY: "Activity Level",
  ETNISITY: "Ethnicity",
  SLE_OR_APS: "SLE or APS",
  GDM: "Gestational Diabetes Mellitus",
  POS: "Polycystic Ovary Syndrome",
  PPE: "Pre-eclampsia",
  T2DM: "Type 2 Diabetes Mellitus",
  SMOKING: "Smoking Status",
  STRESS: "Stress Level",
  PREVIOUS_PRETERM: "Previous Preterm Birth",
  CERVICAL_SURGERY: "History of Cervical Surgery",
  MULTIPLE_GESTATIONS: "Multiple Gestations",
  HEPATITIS_C: "Hepatitis C",
  ECLAMPSIA: "Eclampsia",
  INFERILITY_TREATMENT: "Infertility Treatment",
  GONORHEA_SYPHILIS: "Gonorrhea or Syphilis Infection",
};

export function getRegularNameForId(id: keyof typeof ID_DECLARATION): string {
  return ID_NAME_MAPPING[id] || "Unknown";
}

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
    why: "History of GDM increases the risk of GDM in future pregnancies",
    number: 1,
  },
  [ID.AGE]: {
    label: "What is your age?",
    why: "The older you are, the higher the risk of complications",
    number: 2,
  },
  [ID.WEIGHT]: {
    label: "What is your weight?",
    why: "The heavier you are, the higher the risk of complications",
    number: 3,
  },
  [ID.HEIGHT]: {
    label: "What is your height?",
    why: "The shorter you are, the higher the risk of complications",
    number: 4,
  },
  [ID.DIABETES]: {
    label: "Do you have diabetes?",
    why: "Diabetes increases the risk of complications",
    number: 5,
  },
  [ID.HYPERTENSION]: {
    label: "Do you have hypertension?",
    options: {
      CHRONIC: "Chronic",
      GESTATIONAL: "Gestational",
      NONE: "None",
    },
    why: "Hypertension increases the risk of complications",
    number: 6,
  },
  [ID.ACTIVITY]: {
    label: "Select your activity level:",
    values: {
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "High",
    },
    why: "Low activity level increases the risk of complications",
    number: 7,
  },
  [ID.ETNISITY]: {
    label: "Select your ethnicity:",
    why : "The ethnicity may intefere with the risk of complications",
    number: 8,
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

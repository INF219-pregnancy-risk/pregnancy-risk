export enum RiskType {
  INTEGER = "INTEGER",
  BOOLEAN = "BOOLEAN",
  MULTIPLE = "MULTIPLE",
  CHOICE = "CHOICE",
}

type RiskInputTYPE = {
  [RiskType.INTEGER]: RiskInputInteger;
  [RiskType.BOOLEAN]: RiskInputBoolean;
  [RiskType.MULTIPLE]: RiskInputMultiple;
  [RiskType.CHOICE]: RiskInputChoice;
};

export interface RiskInput {
  label: string;
  why?: string;
  info?: string;
}
// Integer riskinput
export interface RiskInputInteger extends RiskInput {
  min?: number;
  max?: number;
  placeholder?: string;
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
  MEASURING: RiskType.CHOICE,
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
  MEASURING: "Measuring",
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
  [K in ID]?: RiskInputTYPE[(typeof ID_DECLARATION)[K]];
};

export const SurveyQuestions: Readonly<SurveyQuestionsType> = {
  [ID.MEASURING]: {
    label: "Which measuring unit would you like to use?",
    options: {
      METRIC: "Metric",
      IMPERIAL: "Imperial",
    },
    why: "Help the assessment make the correct calculations regarding to your preffered measuring unit.",
    info: "The measuring unit you choose will determine how heights and weights are displayed. The metric system uses centimeters and kilograms, while the imperial system uses feet for height and pounds for weight.",
  },

  [ID.GDM]: {
    label: "Do you have a history of GDM?",
    why: "History of GDM increases the risk of GDM in future pregnancies",
    info: "Gestational diabetes mellitus (GDM) is a condition in which a hormone made by the placenta prevents the body from using insulin effectively. Glucose builds up in the blood instead of being absorbed by the cells. The body is unable to regulate the high levels of glucose in the blood, leading to hyperglycemia.",
  },
  [ID.AGE]: {
    label: "What is your age?",
    why: "The older you are, the higher the risk of complications",
    placeholder: "Enter your age",
  },
  [ID.WEIGHT]: {
    label: "What is your weight?",
    why: "The heavier you are, the higher the risk of complications",
    placeholder: "Enter in kg",
  },
  [ID.HEIGHT]: {
    label: "What is your height?",
    why: "The shorter you are, the higher the risk of complications",
    placeholder: "Enter in cm",
  },
  [ID.DIABETES]: {
    label: "Do you have diabetes?",
    why: "Diabetes increases the risk of complications",
    info: "Diabetes is a disease that occurs when your blood glucose, also called blood sugar, is too high. Blood glucose is your main source of energy and comes from the food you eat. Insulin, a hormone made by the pancreas, helps glucose from food get into your cells to be used for energy. Sometimes your body doesn’t make enough—or any—insulin or doesn’t use insulin well. Glucose then stays in your blood and doesn’t reach your cells.",
  },
  [ID.HYPERTENSION]: {
    label: "Do you have hypertension?",
    options: {
      CHRONIC: "Chronic",
      GESTATIONAL: "Gestational",
      NONE: "None",
    },
    why: "Hypertension increases the risk of complications",
    info: "Hypertension is a condition in which the force of the blood against the artery walls is too high. Usually hypertension is defined as blood pressure above 140/90, and is considered severe if the pressure is above 180/120. High blood pressure often has no symptoms. Over time, if untreated, it can cause health conditions, such as heart disease and stroke.",
  },
  [ID.ACTIVITY]: {
    label: "Select your activity level:",
    values: {
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "High",
    },
    why: "Low activity level increases the risk of complications",
    info: "Physical activity is defined as any bodily movement produced by skeletal muscles that requires energy expenditure. Physical inactivity has been identified as the fourth leading risk factor for global mortality causing an estimated 3.2 million deaths globally.",
  },
  [ID.ETNISITY]: {
    label: "Select your ethnicity:",
    why: "The ethnicity may intefere with the risk of complications",
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

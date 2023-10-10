// Ensure all IDs are used in TYPE
function ensureAllIdsAreUsed<T extends { [K in keyof typeof ID]: any }>(
  obj: T
): T {
  return obj;
}
// Type of survey questions
type SurveyQuestionsType = {
  [K in keyof typeof TYPE]?: RiskInputs[(typeof TYPE)[K]];
};

/**
 * Type of risk input !! mustbe caps !!
 * @enum {string}
 * @readonly
 *
 */
export const RiskType = {
  INTEGER: "INTEGER",
  BOOLEAN: "BOOLEAN",
  CHOICE: "CHOICE",
  MULTIPLE: "MULTIPLE",
} as const;
export type RiskType = (typeof RiskType)[keyof typeof RiskType];

// All riskinputs have this
export interface RiskInput {
  label: string;
}
// Integer riskinput
export interface RiskInputInteger extends RiskInput {
  min?: number;
  max?: number;
}
// Multiple riskinput
export interface RiskInputMultiple extends RiskInput {
  values: { [key: string]: string };
}
// Choice riskinput
export interface RiskInputChoice extends RiskInput {
  options: { [key: string]: string };
}
// Boolean riskinput
export interface RiskInputBoolean extends RiskInput {}

// Map risktype to riskinput
export type RiskInputs = {
  [RiskType.INTEGER]: RiskInputInteger;
  [RiskType.BOOLEAN]: RiskInputBoolean;
  [RiskType.MULTIPLE]: RiskInputMultiple;
  [RiskType.CHOICE]: RiskInputChoice;
};

// ID of riskinputs, !! must be caps !!
export const ID = {
  AGE: "AGE",
  WEIGHT: "WEIGHT",
  HEIGHT: "HEIGHT",
  DIABETES: "DIABETES",
  HYPERTENSION: "HYPERTENSION",
  ACTIVITY: "ACTIVITY",
  ETNISITY: "ETNISITY",
  SLE_OR_APS: "SLE_OR_APS",
  GDM: "GDM",
  POS: "POS",
  PPE: "PPE",
  T2DM: "T2DM",
  SMOKING: "SMOKING",
  STRESS: "STRESS",
  PREVIOUS_PRETERM: "PREVIOUS_PRETERM",
  CERVICAL_SURGERY: "CERVICAL_SURGERY",
  MULTIPLE_GESTATIONS: "MULTIPLE_GESTATIONS",
  HEPATITIS_C: "HEPATITIS_C",
  ECLAMPSIA: "ECLAMPSIA",
  INFERILITY_TREATMENT: "INFERILITY_TREATMENT",
  GONORHEA_SYPHILIS: "GONORHEA_SYPHILIS",


} as const;
export type ID = (typeof ID)[keyof typeof ID];

// Map ID to risktype
export const TYPE = {
  [ID.AGE]: RiskType.INTEGER,
  [ID.WEIGHT]: RiskType.INTEGER,
  [ID.HEIGHT]: RiskType.INTEGER,
  [ID.DIABETES]: RiskType.BOOLEAN,
  [ID.POS]: RiskType.BOOLEAN,
  [ID.GDM]: RiskType.BOOLEAN,
  [ID.PPE]: RiskType.BOOLEAN,
  [ID.SLE_OR_APS]: RiskType.BOOLEAN,
  [ID.T2DM]: RiskType.BOOLEAN,
  [ID.HYPERTENSION]: RiskType.BOOLEAN,
  [ID.SMOKING]: RiskType.BOOLEAN,
  [ID.STRESS]: RiskType.BOOLEAN,
  [ID.PREVIOUS_PRETERM]: RiskType.BOOLEAN,
  [ID.CERVICAL_SURGERY]: RiskType.BOOLEAN,
  [ID.MULTIPLE_GESTATIONS]: RiskType.BOOLEAN,
  [ID.HEPATITIS_C]: RiskType.BOOLEAN,
  [ID.ECLAMPSIA]: RiskType.BOOLEAN,
  [ID.INFERILITY_TREATMENT]: RiskType.BOOLEAN,
  [ID.GONORHEA_SYPHILIS]: RiskType.BOOLEAN,
  [ID.ACTIVITY]: RiskType.MULTIPLE,
  [ID.ETNISITY]: RiskType.CHOICE,
  
} as const;
const _ = ensureAllIdsAreUsed(TYPE); // If TYPE does not cover all IDs, TypeScript will throw an error here.
export type TYPE = (typeof TYPE)[keyof typeof TYPE];

// Survey questions
export const SurveyQuestions: SurveyQuestionsType = {
  [ID.AGE]: {
    label: "What is your age?",
  },
  [ID.WEIGHT]: {
    label: "What is your weight?",
    min: 50,
    max: 200,
  },
  [ID.HEIGHT]: {
    label: "What is your height?",
    min: 100,
    max: 250,
  },
  [ID.DIABETES]: {
    label: "Do you have diabetes?",
  },
  [ID.HYPERTENSION]: {
    label: "Do you have hypertension?",
  },
  [ID.ACTIVITY]: {
    label: "Select your activity level:",
    values: {
      LOW: "Low",
      MODERATE: "Moderate",
      HIGH: "High",
    },
  },
  [ID.ETNISITY]: {
    label: "Select your ethnicity:",
    options: {
      ASIAN: "Asian",
      BLACK: "Black",
      WHITE: "White",
      HISPANIC: "Hispanic",
      OTHER: "Other",
    },
  },
};

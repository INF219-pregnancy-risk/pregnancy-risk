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
  MULTIPLE: "MULIPLE",
  CHOICE: "CHOICE",
} as const;
export type RiskType = (typeof RiskType)[keyof typeof RiskType];

// All riskinputs have this
export interface RiskInput<T> {
  label: string;
  subquestions?: RiskInputSubQuestion<T>[];
}

export interface RiskInputSubQuestion<T> {
  id: ID;
  surveyConditionTriggerValue: (value: T) => boolean;
  input: SurveyQuestionsType;
}
// Integer riskinput
export interface RiskInputInteger<T> extends RiskInput<T> {
  value?: number;
  subquestions?: RiskInputSubQuestion<T>[];
  min?: number;
  max?: number;
  
}
// Multiple riskinput
export interface RiskInputMultiple<T> extends RiskInput<T> {
  values: { [key: string]: string };
  subquestions: RiskInputSubQuestion<T>[];
}
// Choice riskinput
export interface RiskInputChoice<T> extends RiskInput<T> {
  options: { [key: string]: string };
  subquestions: RiskInputSubQuestion<T>[];
}
// Boolean riskinput
export interface RiskInputBoolean<T> extends RiskInput<T> {}

// Map risktype to riskinput
export type RiskInputs = {
  [RiskType.INTEGER]: RiskInputInteger<number>;
  [RiskType.BOOLEAN]: RiskInputBoolean<boolean>;
  [RiskType.MULTIPLE]: RiskInputMultiple<{ [key: string]: boolean }>;
  [RiskType.CHOICE]: RiskInputChoice<string>;
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
} as const;
export type ID = (typeof ID)[keyof typeof ID];

// Map ID to risktype
export const TYPE = {
  [ID.AGE]: RiskType.INTEGER,
  [ID.WEIGHT]: RiskType.INTEGER,
  [ID.HEIGHT]: RiskType.INTEGER,
  [ID.DIABETES]: RiskType.BOOLEAN,
  [ID.HYPERTENSION]: RiskType.BOOLEAN,
  [ID.ACTIVITY]: RiskType.MULTIPLE,
  [ID.ETNISITY]: RiskType.CHOICE,
} as const;

const _ = ensureAllIdsAreUsed(TYPE); // If TYPE does not cover all IDs, TypeScript will throw an error here.
export type TYPE = (typeof TYPE)[keyof typeof TYPE];

const createSubQuestion = <T>(
  id: ID,
  surveyConditionTriggerValue: (value: T) => boolean,
  input: SurveyQuestionsType
): RiskInputSubQuestion<T> => {
  return {
    id,
    surveyConditionTriggerValue,
    input,
  };
};

// Survey questions
export const SurveyQuestions: SurveyQuestionsType = {
  [ID.AGE]: {
    label: "What is your age?",
    subquestions: [
      createSubQuestion<number>( // Fill in type
        ID.WEIGHT,
        (value) => value > 50, // Fill in condition
        {
          [ID.WEIGHT]: { //  create or Change to actual subquestion ID
            label: "Subquestion related to age?",
            min: 50,
            max: 200,
          },
        }
      )
    ],
  },

  [ID.WEIGHT]: {
    label: "What is your weight in kg?",
    subquestions: [
      createSubQuestion<number>( // Fill in type
        ID.HEIGHT,
        (value) => value >= 180, // Fill in condition
        {
          [ID.HEIGHT]: { //  create or Change to actual subquestion ID
            label: "subquestion to weight?",
            min: 100,
            max: 200,
          },
        }
      ),
    ],
  },

  [ID.HEIGHT]: {
    label: "What is your height in cm?",
    subquestions: [
      createSubQuestion( // Fill in type
        ID.WEIGHT,
        () => true, // Fill in condition
        {
          [ID.HEIGHT]: { //  create or Change to actual subquestion ID
            label: "subquestion to height?",
            min: 100,
            max: 200,
          },
        }
      ),
    ],
  },

  [ID.DIABETES]: {
    label: "Do you have diabetes?",
    subquestions: [
      createSubQuestion( // Fill in type
        ID.WEIGHT,
        () => true, // Fill in condition
        {
          [ID.DIABETES]: { //  create or Change to actual subquestion ID
            label: "subquestion to diabetes?",
          },
        }
      ),
    ],
  },

  [ID.HYPERTENSION]: {
    label: "Do you have hypertension?",
    subquestions: [
      createSubQuestion( // Fill in type
        ID.WEIGHT,
        () => true, // Fill in condition
        {
          [ID.HYPERTENSION]: { //  create or Change to actual subquestion ID
            label: "subquestion to hypertension?",
          },
        }
      ),
    ],
  },

  [ID.ACTIVITY]: {
    label: "Select your activity level:",
    values: {
      LOW: "Low",
      MODERATE: "Moderate",
      HIGH: "High",
    },
    subquestions: [
      createSubQuestion(  // Fill in type
        ID.WEIGHT,
        () => true, // Fill in condition
        {
          [ID.WEIGHT]: { //  create or Change to actual subquestion ID
            label: "Subquestion related to activity?",
            min: 50,
            max: 200,
          },
        }
      ),
    ],
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
    subquestions: [
      createSubQuestion( // Fill in type
        ID.WEIGHT,
        () => true, // Fill in condition
        {
          [ID.HEIGHT]: { //  create or Change to actual subquestion ID
            label: "Subquestion related to ethnicity?",
            min: 100,
            max: 250,
          },
        }
      ),
    ],
  },
};

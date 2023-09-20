interface Complication {
  id: string;
  name: {
    long: string;
    short: string;
  };
  description?: string;
  riskScore: RiskScore;
}

interface RiskScore {
  low: scale;
  increased: scale;
  moderate: scale;
  high: scale;
}

interface scale {
  min: number;
  max: number;
  percentage: number;
}

interface RiskFactor {
  inputId: string;
  impact: number; // The impact on base occurrence (e.g., +10%, -5%)
}

interface Inputs {
  [key: string]: Input;
}

interface Input {
  label: string;
  type: SurveyInputTypes;
  description?: string;
  data?: any;
}

enum SurveyInputTypes {
  INTEGER = "integer",
  INTEGER_RANGE = "integerRange",
  BOOLEAN = "bool",
  CHOICE = "choice",
  CHOICE_MULTIPLE = "choiceMultiple",
}

interface Risks {
  complicationID: string;
  riskFactors: RiskFactor[];
}

interface SurveySlide {
  title: string;
  inputs: SurveyInput[];
  followup?: FollowUpQuestion[];
}

interface SurveyInput {
  id: string;
  label: string; // Question label
}

interface FollowUpQuestion {
  if: string; // Input ID that triggers the follow-up
  then: SurveyInput[]; // Follow-up questions
}

const Complications: Complication[] = [
  {
    id: "gdm",
    name: {
      long: "Gestational Diabetes Mellitus",
      short: "GDM",
    },
    description:
      "Gestational diabetes mellitus (GDM) is a condition in which a hormone made by the placenta prevents the body from using insulin effectively. Glucose builds up in the blood instead of being absorbed by the cells. The body is unable to regulate the high levels of glucose in the blood, leading to hyperglycemia.",
    riskScore: {
      low: {
        min: 0,
        max: 3,
        percentage: 10,
      },
      increased: {
        min: 3,
        max: 6,
        percentage: 20,
      },
      moderate: {
        min: 6,
        max: 9,
        percentage: 30,
      },
      high: {
        min: 10,
        max: 999,
        percentage: 40,
      },
    },
  },
];

const SurveyInputs: Inputs = {
  age: {
    label: "Age",
    type: SurveyInputTypes.INTEGER_RANGE,
    data: { min: 15, max: 51 },
  },
  parity: {
    label: "Parity",
    type: SurveyInputTypes.BOOLEAN,
  },
  weight: {
    label: "Weight",
    type: SurveyInputTypes.INTEGER,
  },
  height: {
    label: "Height",
    type: SurveyInputTypes.INTEGER,
  },
  gdmHistory: {
    label: "Family history of diabetes",
    type: SurveyInputTypes.BOOLEAN,
  },
  pos: {
    label: "Polycystic ovary syndrome",
    type: SurveyInputTypes.BOOLEAN,
  },
  hbp: {
    label: "High blood pressure",
    type: SurveyInputTypes.BOOLEAN,
  },
  diet: {
    label: "Diet",
    type: SurveyInputTypes.CHOICE_MULTIPLE,
    data: {
      choices: [
        "Sugar/artificially sweetened beverages 5 times/week",
        "Sweets, ice cream, cakes, cookies 2.5 times/week",
        "Processed meat products 1 times/week",
        "whole grain products <2 times/day",
        "Dairy 2 times/day",
        "Vitamin D intake 5 times/week",
      ],
    },
  },
  activity: {
    label: "Physical activity",
    type: SurveyInputTypes.CHOICE,
    data: {
      choices: [
        "Walking 30 minutes/day",
        "vigorous physical activity",
        "Daily stair climbing 10 stairs",
      ],
    },
  },
};

const ComplicationRisk: Risks[] = [
  {
    complicationID: "gdm",
    riskFactors: [
      {
        inputId: "age",
        impact: 0.05,
      },
      {
        inputId: "parity",
        impact: 0.05,
      },
      {
        inputId: "weight",
        impact: 0.05,
      },
      {
        inputId: "height",
        impact: 0.05,
      },
      {
        inputId: "gdmHistory",
        impact: 0.05,
      },
      {
        inputId: "pos",
        impact: 0.05,
      },
      {
        inputId: "hbp",
        impact: 0.05,
      },
      {
        inputId: "diet",
        impact: 0.05,
      },
      {
        inputId: "activity",
        impact: 0.05,
      },
    ],
  },
];

const SurveySlides: Array<SurveySlide> = [
  {
    title: "Measurement",
    inputs: [{ id: "age", label: "Age" }],
  },
  {
    title: "Parity",
    inputs: [{ id: "parity", label: "Parity" }],
  },
  {
    title: "Weight",
    inputs: [{ id: "weight", label: "Weight" }],
  },
  {
    title: "Height",
    inputs: [{ id: "height", label: "Height" }],
  },
  {
    title: "Family history of diabetes",
    inputs: [
      { id: "gdmHistory", label: "Do you have a family history of diabetes?" },
    ],
  },
  {
    title: "Polycystic ovary syndrome",
    inputs: [{ id: "pos", label: "Do you have polycystic ovary syndrome?" }],
  },
  {
    title: "High blood pressure",
    inputs: [{ id: "hbp", label: "Do you have high blood pressure?" }],
  },
  {
    title: "Diet",
    inputs: [{ id: "diet", label: "What is your diet like?" }],
  },
  {
    title: "Physical activity",
    inputs: [{ id: "activity", label: "What is your physical activity like?" }],
  },
];

export {
  Complications,
  SurveySlides,
  SurveyInputs,
  ComplicationRisk,
  SurveyInputTypes,
};

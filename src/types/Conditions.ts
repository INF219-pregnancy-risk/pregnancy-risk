
import { ID, RiskType, TYPE } from "./RiskInput";
import { Survey, SurveyBoolean, SurveyChoice, SurveyInteger, SurveyMultiple } from "./Survey";

export interface Condition {
  name: string;
  description: string;
  refrences: number[];
  baseRisk: number;
  riskScore: {
    low: number;
    increased: number;
    moderate: number;
    high: number;
  };
}

export interface ConditionsType {
  [key: string]: Condition;
}

export interface Factor {
  id: string;
  type: RiskType;
  multiplier: number;
}

export interface FactorBool extends Factor {
  type: typeof RiskType.BOOLEAN;
  condition: (value: SurveyBoolean) => boolean;
}

export interface FactorInteger extends Factor {
  type: typeof RiskType.INTEGER;
  condition: (value: SurveyInteger) => boolean;
}
export interface FactorString extends Factor {
  type: typeof RiskType.CHOICE;
  condition: (value: SurveyChoice) => boolean;
}
export interface FactorMultiple extends Factor {
  type: typeof RiskType.MULTIPLE;
  condition: (value: SurveyMultiple) => boolean;
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
    riskScore: {
      low: 3,
      increased: 6,
      moderate: 9,
      high: 15,
    }
  },
};

const calculateRisk = (survey: Survey) => {
  const results = [];

  Object.entries(ComplicationFactors).map(([id, factors]) => {
    let risk = Conditions[id].baseRisk

    factors.map(factor => {
      let factorParsed = null;
      switch (factor.type) {
        case RiskType.BOOLEAN:
          factorParsed = factor as FactorBool;
          break;
        case RiskType.INTEGER:
          factorParsed = factor as FactorInteger;
          break;
        case RiskType.CHOICE:
          factorParsed = factor as FactorString;
          break;
       /* case RiskType.MULTIPLE:
          factorParsed = factor as FactorMultiple;
          break;
          */
      }
    })
  });    

  return [
    {
      id: "hypertension",
      score: 56,
      missing: ["age", "weight", "height", "familyHistoryHypertension"],
    },
    {
      id: "diabetes",
      score: 12,
      missing: [],
    },
  ]
}

type ComplicationSet = FactorBool | FactorInteger | FactorString | FactorMultiple;

const gdmFactors = [
  {
    id: ID.AGE,
    type: RiskType.INTEGER,
    condition: (value: number) => value >= 26 && value <= 35, 
    multiplier: 2
  },
  {
    id: ID.AGE,
    type: RiskType.INTEGER,
    condition: (value: number) => value > 35, 
    multiplier: 3
  },
  {
    id: ID.DIABETES,
    type: RiskType.BOOLEAN,
    condition: (value: boolean) => value,
    multiplier: 3
  },
  {
    id: ID.GDM,
    type: RiskType.BOOLEAN,
    condition: (value: boolean) => value,
    multiplier: 10
  },
 
  {
    id: ID.ETNISITY,
    type: RiskType.CHOICE,
    condition: (value: string) => value !== "WHITE",
    multiplier: 2.5
  },
  {
    id: ID.POS,
    type: RiskType.BOOLEAN,
    condition: (value: boolean) => value,
    multiplier: 2.5
  },
  {
    id: ID.HYPERTENSION,
    type: RiskType.BOOLEAN,
    condition: (value: boolean) => value,
    multiplier: 2.5
  },
  {
    id: ID.ACTIVITY,
    type: RiskType.CHOICE,
    condition: (value: string) => value === "LOW",
    multiplier: 1
  },
  {
    id: ID.ACTIVITY,
    type: RiskType.CHOICE,
    condition: (value: string) => value === "MEDIUM",
    multiplier: 2
  },
  {
    id: ID.ACTIVITY,
    type: RiskType.CHOICE,
    condition: (value: string) => value === "HIGH",
    multiplier: 3
  }
];

const preeclampsiaFactors = [
  {
    id: ID.HYPERTENSION,
    type: RiskType.CHOICE,
    condition: (value: string) => value === "CHRONIC",
    multiplier: 6
  },
  {
    id: ID.HYPERTENSION,
    type: RiskType.CHOICE,
    condition: (value: string) => value === "YES",
    multiplier: 2
  },

  {
    id: ID.ETNISITY,
    type: RiskType.CHOICE,
    condition: (value: string) => value === "Afro-Caribbean",
    multiplier: 2.5
  },
  {
    id: ID.PPE,
    type: RiskType.BOOLEAN,
    condition: (value: boolean) => value ,
    multiplier: 6
  },
  {
    id: ID.SLE_OR_APS,
    type: RiskType.BOOLEAN,
    condition: (value: boolean) => value ,
    multiplier: 2
  },
  {
    id: ID.T2DM,
    type: RiskType.BOOLEAN,
    condition: (value: boolean) => value,
    multiplier: 1
  }
];
  const pretermDeliveryFactors = [
    {
      id: ID.AGE,
      type: RiskType.INTEGER,
      condition: (value: number) => value > 35, 
      multiplier: 1.4
    },
    {
      id: ID.ETNISITY,
      type: RiskType.CHOICE,
      condition: (value: string) => value === "BLACK",
      multiplier: 1.4
    },
    /* bmi */
    {
      id: ID.SMOKING,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value,
      multiplier: 1.4
    },
    {
      id: ID.STRESS,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value,
      multiplier: 2
    },
    {
      id: ID.PREVIOUS_PRETERM,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value ,
      multiplier: 5
    },
    {
      id: ID.CERVICAL_SURGERY,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value,
      multiplier: 1
    },
    {
      id: ID.MULTIPLE_GESTATIONS,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value,
      multiplier: 10
    },
    {
      id: ID.HEPATITIS_C,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value,
      multiplier: 2
    },
    {
      id: ID.DIABETES,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value ,
      multiplier: 4
    },
    {
      id: ID.GDM,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value ,
      multiplier: 1.5
    },
    {
      id: ID.HYPERTENSION,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value ,
      multiplier: 3
    },
    {
      id: ID.ECLAMPSIA,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value ,
      multiplier: 7
    },
    {
      id: ID.INFERILITY_TREATMENT,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value ,
      multiplier: 5
    },
    {
      id: ID.GONORHEA_SYPHILIS,
      type: RiskType.BOOLEAN,
      condition: (value: boolean) => value,
      multiplier: 1.5
    },
  ];

export type ComplicationFactors = {
    [key: string]: ComplicationSet[]
  }

export const ComplicationFactors = {
  gdm: gdmFactors,
  preeclampsia: preeclampsiaFactors,
  pretermDelivery: pretermDeliveryFactors,
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

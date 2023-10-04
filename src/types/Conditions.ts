import { RiskType } from "./RiskInput";

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
  type: typeof RiskType.BOOLEAN;
  condition: (value: boolean) => boolean;
}

export interface FactorInteger extends Factor {
  type: typeof RiskType.INTEGER;
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

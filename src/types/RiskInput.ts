// types.ts

export enum RiskType {
  INTEGER = "integer",
  BOOLEAN = "boolean",
  MULTIPLE = "multiple",
  CHOICE = "choice",
}

export interface RiskInput {
  id: InputDeclarations;
  label: string;

}

export interface RiskInputInteger extends RiskInput {

  min?: number;
  max?: number;
}

export interface RiskInputBoolean extends RiskInput {

}

export interface RiskInputMultiple extends RiskInput {

  values: { [key: string]: string };
}

export interface RiskInputChoice extends RiskInput {

  options: { [key: string]: string };
}

export type SurveyBoolean = boolean;

export type SurveyInteger = number;

export type SurveyMultiple = { [key: string]: boolean };

export type SurveyChoice = string;

export type SurveyData = SurveyBoolean | SurveyInteger | SurveyMultiple | SurveyChoice;

export type InputTypes = {
  [key in InputDeclarations]: RiskType;
}

export enum InputDeclarations {
  AGE="age",
  WEIGHT ="weight",
  HEIGHT = "height",
  DIABETES = "diabetes",
  GDM = "gdm",
  PCOS = "pcos",
  ACTIVITY = "activity",
  ETNISITY = "etnisity",
}

export const InputType: InputTypes = {
  [InputDeclarations.AGE]: RiskType.INTEGER,
  [InputDeclarations.WEIGHT]: RiskType.INTEGER,
  [InputDeclarations.HEIGHT]: RiskType.INTEGER,
  [InputDeclarations.DIABETES]: RiskType.BOOLEAN,
  [InputDeclarations.GDM]: RiskType.BOOLEAN,
  [InputDeclarations.ACTIVITY]: RiskType.MULTIPLE,
  [InputDeclarations.ETNISITY]: RiskType.CHOICE,
  [InputDeclarations.PCOS]: RiskType.BOOLEAN,
}

export interface Survey {
  data: {
    [key in InputDeclarations]?: SurveyData;
  };
  skipped: InputDeclarations[];
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
    baseRisk: 0.1
  }
}

  
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
import { ID } from "./RiskInput";
import { MapIDToType, Survey } from "./Survey";

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

export type Conditions = {
  [key in CID]: Condition;
};

export const Conditions = {
  GDM: {
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
      moderate: 10,
      high: 15,
    },
  },
  PREECLAMPSIA: {
    name: "Preeclampsia",
    description: `Preeclampsia is a pregnancy-specific syndrome that is defined by the new onset of
    hypertension and proteinuria after 20 weeks of gestation. It is a leading cause of
    maternal and perinatal morbidity and mortality worldwide [11].`,
    refrences: [12, 13, 14],
    baseRisk: 0.1,
    riskScore: {
      low: 3,
      increased: 6,
      moderate: 9,
      high: 15,
    },
  },
  PRETERM_DELIVERY: {
    name: "Preterm Delivery",
    description: `Preterm delivery is defined as delivery before 37 weeks of gestation and is a major
    cause of neonatal morbidity and mortality [15].`,
    refrences: [16, 17, 18],
    baseRisk: 0.1,
    riskScore: {
      low: 8,
      increased: 15,
      moderate: 25,
      high: 40,
    },
  },
};

export type CID = keyof typeof Conditions;

export const CID = Object.freeze(
  Object.keys(Conditions).reduce(
    (acc, key) => ({ ...acc, [key]: key }),
    {}
  ) as { [key in CID]: key }
);

export interface Factor<K extends ID> {
  multiplier: number;
  condition: (value: MapIDToType<K>) => boolean;
}

export type Factors = {
  [K in ID]?: Factor<K>[];
};

const GDM: Factors = {
  [ID.AGE]: [
    {
      multiplier: 2,
      condition: (value) => value >= 26 && value <= 35,
    },
    {
      multiplier: 3,
      condition: (value) => value > 35,
    },
  ],
  [ID.ACTIVITY]: [
    {
      multiplier: 2,
      condition: (value) =>
        Object.entries(value).filter(([key, value]) => value).length > 2,
    },
  ],
  [ID.POS]: [
    {
      condition: (value) => value["WHITE"] && value["AFRICAN"],
      multiplier: 2.5,
    },
  ],
  [ID.DIABETES]: [
    {
      condition: (value) => value,
      multiplier: 3,
    },
  ],
  [ID.GDM]: [
    {
      condition: (value) => value,
      multiplier: 10,
    },
  ],
  [ID.ETNISITY]: [
    {
      condition: (value) => value !== "WHITE",
      multiplier: 2.5,
    },
  ],
};

const PREECLAMPSIA: Factors = {
  [ID.HYPERTENSION]: [
    {
      condition: (value) => value === "CHRONIC",
      multiplier: 6,
    },
    {
      condition: (value) => value === "YES",
      multiplier: 2,
    },
  ],
  [ID.ETNISITY]: [
    {
      condition: (value) => value !== "WHITE",
      multiplier: 2.5,
    },
  ],
  [ID.PPE]: [
    {
      condition: (value) => value,
      multiplier: 6,
    },
  ],
  [ID.SLE_OR_APS]: [
    {
      condition: (value) => value,
      multiplier: 2,
    },
  ],
  [ID.T2DM]: [
    {
      condition: (value) => value,
      multiplier: 1,
    },
  ],
};

const pretermDeliveryFactors: Factors = {
  [ID.AGE]: [
    {
      multiplier: 1.4,
      condition: (value) => value > 35,
    },
  ],
  [ID.ETNISITY]: [
    {
      multiplier: 1.4,
      condition: (value) => value === "BLACK",
    },
  ],
  [ID.SMOKING]: [
    {
      multiplier: 1.4,
      condition: (value) => value,
    },
  ],
  [ID.STRESS]: [
    {
      multiplier: 2,
      condition: (value) => value,
    },
  ],
  [ID.PREVIOUS_PRETERM]: [
    {
      multiplier: 5,
      condition: (value) => value,
    },
  ],
  [ID.CERVICAL_SURGERY]: [
    {
      multiplier: 1,
      condition: (value) => value,
    },
  ],
  [ID.MULTIPLE_GESTATIONS]: [
    {
      multiplier: 10,
      condition: (value) => value,
    },
  ],
  [ID.HEPATITIS_C]: [
    {
      multiplier: 2,
      condition: (value) => value,
    },
  ],
  [ID.DIABETES]: [
    {
      multiplier: 4,
      condition: (value) => value,
    },
  ],
  [ID.GDM]: [
    {
      multiplier: 1.5,
      condition: (value) => value,
    },
  ],
  [ID.HYPERTENSION]: [
    {
      multiplier: 3,
      condition: (value) => value === "CHRONIC",
    },
  ],
  [ID.ECLAMPSIA]: [
    {
      multiplier: 7,
      condition: (value) => value,
    },
  ],
  [ID.INFERILITY_TREATMENT]: [
    {
      multiplier: 5,
      condition: (value) => value,
    },
  ],
  [ID.GONORHEA_SYPHILIS]: [
    {
      multiplier: 1.5,
      condition: (value) => value,
    },
  ],
};

const Complications: { [key in CID]: Factors } = {
  [CID.GDM]: GDM,
  [CID.PREECLAMPSIA]: PREECLAMPSIA,
  [CID.PRETERM_DELIVERY]: pretermDeliveryFactors,
};

export type ResultType = {
  id: CID;
  increasedBy: { [key in ID]?: number };
  risk: number;
  max: number;
  missingFactors: ID[];
};

export const CalculateRisk = (survey: Survey) => {
  const results = [] as ResultType[];

  Object.entries(Complications).forEach(
    ([complicationId, complicationFactors]) => {
      let risk = 0;
      let max = 0;
      const missingFactors: ID[] = [];
      const increasedBy: { [key in ID]?: number } = {};

      Object.entries(complicationFactors).forEach(([id, factors]) => {
        const ID = id as ID;

        let absoluteMax = 0;
        factors.map((factor) => {
          absoluteMax = Math.max(absoluteMax, factor.multiplier);
        });
        max = max + absoluteMax;

        if (ID in survey.skipped) {
          missingFactors.push(ID);
          return;
        }

        const value = survey.data[ID];

        if (value === undefined) {
          missingFactors.push(ID);
          return;
        }

        factors.forEach((factor) => {
          const condition = factor.condition as (
            value: MapIDToType<typeof ID>
          ) => boolean;

          if (condition(value)) {
            risk = risk + factor.multiplier;

            if (increasedBy[ID] === undefined) {
              increasedBy[ID] = factor.multiplier;
            } else {
              increasedBy[ID] = (increasedBy[ID] as number) + factor.multiplier;
            }
          }
        });
      });
      results.push({
        id: complicationId as CID,
        increasedBy,
        risk,
        max,
        missingFactors,
      } as ResultType);
    }
  );

  return results;
};

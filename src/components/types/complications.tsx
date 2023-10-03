interface Complication {
    name: string;
    id: string;
    description?: string;
    baserisk: number;
    refrences: number[];
    riskScore: RiskScore;
  }
  
  interface RiskFactors {
    id: string;
    risks: RiskFactor[];
  }

  interface RiskScore {
    low: string;
    medium: string;
    high: string;
    veryhigh: string;
  }

  interface RiskFactor{
    name: string;
    factor: number;
    ranges?: range[];
    conditions?: Condition[];
  }
  
  interface range {
    range: string;
    factor: number;
  }
  
  interface Condition {
    name: string;
    value: boolean;
    factor: number;
  }

  const GMDRisk: RiskFactors = {
    id: "GDM",
    risks: [
        {
            name: "Age 15 to 50 years",
            factor: 0,
            ranges: [
                { range: "<26", factor: 0 },
                { range: "26-35", factor: 2 },
                { range: ">35", factor: 3 },
            ]
        },
        {
            name: "Parity-0to7(>2-1.5times)",
            factor: 1.5,
        },
        {
            name: "History of - GDM, congenital anomalies, etc.",
            factor: 10,
            conditions: [
                { name: "History of GDM", value: true, factor: 10 },
                { name: "Congenital anomalies", value: true, factor: 2.5 },
                { name: "Stillbirth", value: true, factor: 2.5 },
                { name: "Miscarriage", value: true, factor: 2.5 },
                { name: "Preterm delivery", value: true, factor: 2.5 },
                { name: "Macrosomia", value: true, factor: 4 },
            ]
        },
        {
            name: "Weight - 20 to 120kg",
            factor: 0,
            conditions: [
                { name: "BMI > 24", value: true, factor: 2.5 },
                { name: "BMI > 29", value: true, factor: 6 },
            ]
        },
        {
            name: "Ethnicity",
            factor: 0,
            conditions: [
                { name: "White", value: true, factor: 0 },
                { name: "Other", value: true, factor: 2.5 },
            ]
        },
        {
            name: "Family history of diabetes",
            factor: 0,
            conditions: [
                { name: "Yes", value: true, factor: 3 },
            ]
        },
        {
            name: "Polycystic ovary syndrome",
            factor: 2.5,
        },
        {
            name: "High blood pressure",
            factor: 0,
            conditions: [
                { name: "Yes", value: true, factor: 2.5 },
                { name: "No family history of hypertension/high blood pressure", value: true, factor: 1.5 },
            ]
        },
    ]
};

const complications: Complication[] = [
    {
        name: "Gestational Diabetes Mellitus",
        id: "GDM",
        description: "Description goes here",
        baserisk: 10,
        refrences: [0, 1, 2, 3, 4, 5, 6, 7],
        riskScore: {
            low: "0-4",
            medium: "5-9",
            high: "10-14",
            veryhigh: "15+"
        }
    }
];



  

    

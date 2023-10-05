"use client";

import {
  RiskInputType,
  RiskInputs,
  RiskType,
  Survey,
  SurveyBoolean,
  SurveyData,
  SurveyInteger,
  SurveyMultiple,
  SurveySubQuestion,
} from "@/types/RiskInput";
import SurveyParseInput from "@/components/inputs/survey/SurveyParseInput";
import PageWarpper from "@/components/layout/PageWarpper";
import SurveyContainer from "@/components/layout/survey/SurveyContainer";
import SurveyView from "@/components/layout/survey/SurveyView";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import {
  getSurveyIndexUtil,
  getSurveyUtil,
  setSurveyIndexUtil,
  setSurveyUtil,
} from "@/utils/StoreSurvey";

const SurveyInputSlides: RiskInputs[] = [
  {
    id: "age",
    label: "What is your age?",
    type: RiskType.INTEGER,
    min: 1,
    max: 10,
    condition: [
      {
        triggerValue: (value) => value >= 50,
        subQuestions: [
          {
            id: "example 0",
            label: "example label 0",
            type: RiskType.BOOLEAN,
          },
        ],
      },
    ],
  },
  {
    id: "diabetes",
    label: "Do you have any in your family with diabetes?",
    type: RiskType.BOOLEAN,
    condition: [
      {
        triggerValue: (value) => value,
        subQuestions: [
          {
            id: "example 0",
            label: "example label 0",
            type: RiskType.BOOLEAN,
          },
        ],
      },
    ],
  },
  {
    id: "activity",
    label: "Do you excerise?",
    type: RiskType.MULTIPLE,
    values: {
      walking: "Walking 20 min a day",
      running: "Lifting 3 times a week",
      swimming: "Swimming 2 times a month",
    },
    condition: [
      {
        triggerValue: (value) =>
          Object.entries(value).filter(([key, value]) => !value).length > 1,
        subQuestions: [
          {
            id: "example 0",
            label: "example label 0",
            type: RiskType.BOOLEAN,
          },
        ],
      },
    ],
  },

  {
    id: "etnisity",
    label: "What is your etnisity?",
    type: RiskType.CHOICE,
    options: {
      white: "White / Something",
      black: "Black / Afro",
      asian: "Asian",
      other: "Other",
    },
    condition: [
      {
        triggerValue: (value) => value === "black",
        subQuestions: [
          {
            id: "example 0",
            label: "example label 0",
            type: RiskType.BOOLEAN,
          },
        ],
      },
    ],
  },
];

console.log("Subquestions");

const SurveyPage = () => {
  const [survey, setSurvey] = React.useState<Survey>({
    data: {},
    skipped: [],
  });
  const [showSubQuestions, setShowSubQuestions] = React.useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);

  const [nextButton, setNextButton] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (isSubmitted) {
      router.push("/survey/results");
    }
  }, [isSubmitted, router]);

  useEffect(() => {
    setSurvey(getSurveyUtil());
    setCurrentSlide(getSurveyIndexUtil());
  }, []);

  useEffect(() => {
    setSurveyUtil(survey);
  }, [survey]);

  useEffect(() => {
    setSurveyIndexUtil(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    console.log("Effect triggered: ", survey, currentSlide);

    if (currentSlide < SurveyInputSlides.length) {
      const currentInput = SurveyInputSlides[
        currentSlide
      ] as RiskInputType<SurveyData>;
      const currentInputData = survey.data[currentInput.id] as SurveyData;

      console.log("Current Input: ", currentInput);
      console.log("Current Input Data: ", currentInputData);

      if (currentInput.condition) {
        for (const condition of currentInput.condition) {
          if (condition.triggerValue(currentInputData)) {
            console.log("Condition met, showing subquestions");
            setShowSubQuestions(true);
            return;
          }
        }
      }
    }
    console.log("No condition met, hiding subquestions");
    setShowSubQuestions(false);
  }, [survey, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prevIndex) => {
      if (prevIndex === SurveyInputSlides.length - 1) {
        setIsSubmitted(true);
        return prevIndex;
      }

      const nextSlideIndex = Math.min(
        prevIndex + 1,
        SurveyInputSlides.length - 1
      );

      setNextButton(false);
      return nextSlideIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <PageWarpper>
      <h1 className="pb-4">You are at survey</h1>

      <SurveyContainer index={currentSlide}>
        <SurveyView
          setSurvey={setSurvey}
          nextButton={nextButton}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          currentSlide={currentSlide}
        >
          {isLoading ? (
            <h1>Loading.....</h1>
          ) : (
            SurveyInputSlides.map((input, index) => {
              return (
                index == currentSlide && (
                  <SurveyParseInput
                    input={input}
                    setSurvey={setSurvey}
                    survey={survey}
                    nextSlide={nextSlide}
                    setNextButton={setNextButton}
                    showSubQuestions={showSubQuestions}
                  />
                )
              );
            })
          )}
        </SurveyView>
      </SurveyContainer>
    </PageWarpper>
  );
};

export default SurveyPage;

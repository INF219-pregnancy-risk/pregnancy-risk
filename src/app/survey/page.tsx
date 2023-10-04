"use client";

import { RiskInputs, RiskType, Survey } from "@/types/RiskInput";
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
    max: 110,
    subQuestions: [
      {
        id: "ost",
        label: "Did you have any ost?",
        type: RiskType.BOOLEAN,
        condition: (value) => value > 50
      }
    ]
  },

  {
    id: "weight",
    label: "What is your weight in kg?",
    type: RiskType.INTEGER,
    min: 1,
    max: 700,
  },

  {
    id: "height",
    label: "What is your height in cm?",
    type: RiskType.INTEGER,
    min: 1,
    max: 300,
  },
  {
    id: "etnisity",
    label: "What is your etnisity?",
    type: RiskType.CHOICE,
    options: {
      white: "White",
      afroCaribbean: "Afro-Caribbean",
      black: "Black",
      asian: "Asian",
      other: "Other",
    },
  },
  {
    id: "kids",
    label: "Do you have any kids already?",
    type: RiskType.BOOLEAN,
    subQuestions: [
      {
        id: "stillbirth",
        label: "Did you have any stillbirth?",
        type: RiskType.BOOLEAN,
        condition: true
      }
    ]
  },


  {
    id: "diabetes",
    label: "Do you have anyone in your family with diabetes?",
    type: RiskType.BOOLEAN,
  },
  {
    id: "PCOS",
    label: "Do you have polycystic ovary syndrome (PCOS)?",
    type: RiskType.BOOLEAN,
  },
  {
    id: "blood-pressure",
    label: "Do you have a family history of hypertension/high blood pressure?",
    type: RiskType.BOOLEAN,
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
  },
  {
    id: "diet",
    label: "Do you diet?",
    type: RiskType.BOOLEAN,
  },
];

const SurveyPage = () => {
  const [survey, setSurvey] = React.useState<Survey>({ data: {}, skipped: [] });
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
                index === currentSlide && (
                  <div key={input.id}>
                    <SurveyParseInput
                      nextSlide={nextSlide}
                      setNextButton={setNextButton}
                      setSurvey={setSurvey}
                      survey={survey}
                      input={input}
                    />
                    {input.subQuestions && input.subQuestions.map(subInput => {
                      let conditionMet = false;
                      const userAnswer = survey.data[input.id];

                      if (typeof subInput.condition === "boolean") {
                        conditionMet = userAnswer === subInput.condition;
                      } else if (typeof subInput.condition === "function") {
                        conditionMet = subInput.condition(userAnswer);
                      }

                      if (conditionMet) {
                        return (
                          <SurveyParseInput
                            key={subInput.id}
                            nextSlide={nextSlide}
                            setNextButton={setNextButton}
                            setSurvey={setSurvey}
                            survey={survey}
                            input={subInput}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
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
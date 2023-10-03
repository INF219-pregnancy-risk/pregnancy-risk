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
    max: 10,
  },
  {
    id: "diabetes",
    label: "Do you have any in your family with diabetes?",
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
    id: "etnisity",
    label: "What is your etnisity?",
    type: RiskType.CHOICE,
    options: {
      white: "White / Something",
      black: "Black / Afro",
      asian: "Asian",
      other: "Other",
    },
  },
];

const SurveyPage = () => {
  const [survey, setSurvey] = React.useState<Survey>(
    (getSurveyUtil() as Survey) || { data: {}, skipped: [] }
  );
  const [currentSlide, setCurrentSlide] = React.useState<number>(
    getSurveyIndexUtil() || 0
  );
  const [nextButton, setNextButton] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const router = useRouter();

  const query = useEffect(() => {
    if (isSubmitted) {
      router.push("/survey/results");
    }
  }, [isSubmitted]);

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
      <p className="pb-4">Current slide: {currentSlide}</p>
      <p>survey: {JSON.stringify(survey)}</p>
      <SurveyContainer index={currentSlide}>
        <SurveyView
          setSurvey={setSurvey}
          nextButton={nextButton}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          input={SurveyInputSlides[currentSlide]}
          currentSlide={currentSlide}
        >
          <SurveyParseInput
            nextSlide={nextSlide}
            setNextButton={setNextButton}
            setSurvey={setSurvey}
            survey={survey}
            input={SurveyInputSlides[currentSlide]}
          />
        </SurveyView>
      </SurveyContainer>
    </PageWarpper>
  );
};

export default SurveyPage;

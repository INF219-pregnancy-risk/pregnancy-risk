"use client";

import { InputDeclarations, RiskInput, RiskInputChoice, RiskInputInteger, RiskInputMultiple, Survey } from "@/types/RiskInput";
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

const SurveyInputSlides: RiskInput[] = [
  {
    id: InputDeclarations.AGE,
    label: "What is your age?",
    min: 0,
    max: 100,
  } as RiskInputInteger,
  {
    id: InputDeclarations.DIABETES,
    label: "What is your age?",
  },
  {
    id: InputDeclarations.ETNISITY,
    label: "What is your etnisity?",
    options: {
      white: "White",
      black: "Black",
      asian: "Asian",
      other: "Other",
    },
  } as RiskInputChoice,
  {
    id: InputDeclarations.ACTIVITY,
    label: "What is your activity?",
    values: {
      walking: "Walking",
      running: "Running",
      swimming: "Swimming",
    },
  } as RiskInputMultiple,

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
      <p>
         {JSON.stringify(survey)}
      </p>
     
      <SurveyContainer index={currentSlide}>
        <SurveyView
          setSurvey={setSurvey}
          nextButton={nextButton}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          SurveyInputs={SurveyInputSlides}
          currentSlide={currentSlide}
        >
          {isLoading ? (
            <h1>Loading.....</h1>
          ) : (
            SurveyInputSlides.map((input, index) => {
              return (
                index == currentSlide && (
                  <SurveyParseInput
                    key={input.id}
                    nextSlide={nextSlide}
                    setNextButton={setNextButton}
                    setSurvey={setSurvey}
                    survey={survey}
                    input={input}
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

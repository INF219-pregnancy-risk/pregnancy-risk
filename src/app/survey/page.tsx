"use client";

import { ID } from "@/types/RiskInput";
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
import { Survey, SurveyEntries } from "@/types/Survey";

const SurveyPage = () => {
  const [survey, setSurvey] = React.useState<Survey>({ data: {}, skipped: [] });
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);
  const [showSubQuestions, setShowSubQuestions] = React.useState<boolean>(false);

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
      if (prevIndex === SurveyEntries.length - 1) {
        setIsSubmitted(true);
        return prevIndex;
      }

      const nextSlideIndex = Math.min(prevIndex + 1, SurveyEntries.length - 1);

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
      <p>{JSON.stringify(survey)}</p>

      <SurveyContainer index={currentSlide}>
        <SurveyView
          setSurvey={setSurvey}
          nextButton={nextButton}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          currentSlide={currentSlide}
          surveyID={SurveyEntries[currentSlide][0]}
        >
          {isLoading ? (
            <h1>Loading.....</h1>
          ) : (
            SurveyEntries.map(([id, ID], index) => {
              return (
                index == currentSlide && (
                  <SurveyParseInput
                    key={id}
                    nextSlide={nextSlide}
                    setNextButton={setNextButton}
                    setSurvey={setSurvey}
                    survey={survey}
                    questionID={id}
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
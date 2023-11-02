"use client";

import SurveyButton from "@/components/inputs/buttons/SurveyButton";
import ProgressSurvey from "@/components/inputs/info/ProgressSurvey";
import SurveyParseInput from "@/components/inputs/survey/SurveyParseInput";
import PageWarpper from "@/components/layout/PageWrapper";
import SurveyContainer from "@/components/layout/survey/SurveyContainer";
import SurveyView from "@/components/layout/survey/SurveyView";
import { ID } from "@/types/RiskInput";
import { Survey, SurveyEntries } from "@/types/Survey";
import {
  getSurveyIndexUtil,
  getSurveyUtil,
  setSurveyIndexUtil,
  setSurveyUtil,
} from "@/utils/StoreSurvey";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const SurveyPage = () => {
  const [survey, setSurvey] = React.useState<Survey>({ data: {}, skipped: [] });
  const [currentSlide, setCurrentSlide] = React.useState<number>(0);

  const [nextButton, setNextButton] = React.useState<boolean>(true);
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
      setDirection(1);

      if (prevIndex === SurveyEntries.length - 1) {
        setIsSubmitted(true);
        return prevIndex;
      }

      const nextSlideIndex = Math.min(prevIndex + 1, SurveyEntries.length - 1);

      //setNextButton(false);
      return nextSlideIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prevIndex) => Math.max(prevIndex - 1, 0));
    setDirection(-1);
  };

  const handleSkip = useCallback(() => {
    if (survey.skipped.includes(SurveyEntries[currentSlide][0] as ID)) {
      return;
    }
    setSurvey((prev) => {
      const id = SurveyEntries[currentSlide][0] as ID;
      const data = prev.data;
      delete data[id];

      return {
        data,
        skipped: [...prev.skipped, id],
      };
    });
  }, [survey, currentSlide]);

  const [direction, setDirection] = React.useState(0);

  return (
    <SurveyContainer
      index={currentSlide}
      className="min-h-screen-nav overflow-hidden flex flex-col"
    >
      <div className="grid-layout text-primary-foreground bg-primary dark:bg-primary/50 py-8 gap-4">
        <h2 className="text-center text-sm">
          Question {currentSlide + 1} of {SurveyEntries.length}
        </h2>
        <ProgressSurvey
          currentSlide={currentSlide}
          totalSlides={SurveyEntries.length}
        />
      </div>
      <div className="flex flex-col flex-1">
        <SurveyView
          direction={direction}
          surveyID={SurveyEntries[currentSlide][0]}
          className="flex flex-1"
        >
          {isLoading ? (
            <h1>Loading.....</h1>
          ) : (
            SurveyEntries.map(([id, value], index) => {
              return (
                index === currentSlide && (
                  <SurveyParseInput
                    questionID={id}
                    {...{
                      survey,
                      setNextButton,
                      setSurvey,
                      nextSlide,
                    }}
                  />
                )
              );
            })
          )}
        </SurveyView>
        <div className="h-min flex justify-center items-center gap-8 py-8">
          <SurveyButton variant={"default"} onClick={prevSlide} size={"lg"}>
            PREV
          </SurveyButton>
          <SurveyButton
            variant={"secondary"}
            size={"lg"}
            onClick={() => {
              handleSkip();
              nextSlide();
            }}
          >
            SKIP
          </SurveyButton>
          <SurveyButton
            disabled={!nextButton}
            variant={"default"}
            size={"lg"}
            onClick={() => {
              nextSlide();
            }}
          >
            NEXT
          </SurveyButton>
        </div>
      </div>
    </SurveyContainer>
  );
};

export default SurveyPage;

"use client";

import SurveyButton from "@/components/inputs/buttons/SurveyButton";
import ProgressSurvey from "@/components/inputs/info/ProgressSurvey";
import SurveyParseInput from "@/components/inputs/survey/SurveyParseInput";
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
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "100dvw" : "-100dvw",
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100dvw" : "-100dvw",
      opacity: 0,
    };
  },
};

const SurveyPage = () => {
  const [survey, setSurvey] = React.useState<Survey>();
  const [currentSlide, setCurrentSlide] = React.useState<[number, ID]>();

  const [nextButton, setNextButton] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const survey = getSurveyUtil();
    const index = getSurveyIndexUtil();
    setSurvey(survey);
    setCurrentSlide([index, SurveyEntries[index][0]]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      router.push("/survey/results");
    }
  }, [isSubmitted, router]);

  useEffect(() => {
    if (!survey) return;
    setSurveyUtil(survey);
  }, [survey]);

  useEffect(() => {
    if (!currentSlide) return;
    setSurveyIndexUtil(currentSlide[0]);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      setDirection(1);
      if (!prev) return;

      const [index, id] = prev;

      if (index === SurveyEntries.length - 1) {
        setIsSubmitted(true);
        setIsLoading(true);
        return [index, id];
      }

      const nextID = SurveyEntries[index + 1][0] as ID;

      const nextSlideIndex = Math.min(index + 1, SurveyEntries.length - 1);

      //setNextButton(false);
      return [nextSlideIndex, nextID];
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (!prev) return;

      const [index, id] = prev;
      const nextID = Math.max(index - 1, 0);
      return [nextID, SurveyEntries[nextID][0] as ID];
    });
    setDirection(-1);
  };

  const handleSkip = useCallback(() => {
    if (!currentSlide) return;
    if (!survey) return;

    if (survey.skipped.includes(currentSlide[1])) {
      return;
    }
    setSurvey((prev) => {
      if (!prev) return;
      const data = prev.data;
      delete data[currentSlide[1]];

      return {
        data,
        skipped: [...prev.skipped, currentSlide[1]],
      };
    });
  }, [survey, currentSlide]);

  const [direction, setDirection] = React.useState(0);

  return (
    <SurveyContainer className="min-h-screen-nav overflow-hidden flex flex-col">
      {isLoading || !currentSlide || !survey ? (
        <div className="flex flex-1 items-center justify-center dark:bg-secondary/5 bg-primary/5">
          <div className="flex h-10 w-10 aspect-square border-4 rounded-full border-t-primary animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid-layout text-muted-foreground bg-muted dark:bg-primary/40 py-8 gap-4">
            <h2 className="text-center text-sm">
              Question {currentSlide[0] + 1} of {SurveyEntries.length}
            </h2>
            <ProgressSurvey
              currentSlide={currentSlide[0]}
              totalSlides={SurveyEntries.length}
            />
          </div>
          <div className="flex flex-col flex-1">
            <SurveyView
              direction={direction}
              surveyID={currentSlide[1]}
              className="flex flex-1"
            >
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={direction}
              >
                <motion.div
                  key={currentSlide[0]}
                  variants={variants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full relative w-full"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <SurveyParseInput
                    questionID={currentSlide[1]}
                    {...{
                      survey,
                      setNextButton,
                      setSurvey,
                      nextSlide,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </SurveyView>
          </div>
        </>
      )}
      <div className="h-min flex justify-center items-center gap-8 py-8">
        <SurveyButton
          variant={"default"}
          onClick={prevSlide}
          size={"lg"}
          icon={<ArrowBack />}
          disabled={isLoading}
        >
          <span className="min-w-[45px] flex justify-center">BACK</span>
        </SurveyButton>
        <SurveyButton
          disabled={isLoading}
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
          disabled={!nextButton || isLoading}
          variant={
            !currentSlide || currentSlide[0] < SurveyEntries.length - 1
              ? "default"
              : "success"
          }
          icon={<ArrowForward />}
          iconPosition="right"
          size={"lg"}
          onClick={() => {
            nextSlide();
          }}
        >
          <span className="min-w-[45px] flex justify-center">
            {!currentSlide || currentSlide[0] < SurveyEntries.length - 1
              ? "NEXT"
              : "FINISH"}
          </span>
        </SurveyButton>
      </div>
    </SurveyContainer>
  );
};

export default SurveyPage;

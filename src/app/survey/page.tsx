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
import {
  ArrowBack,
  ArrowForward,
  DangerousOutlined,
  ErrorOutlineRounded,
  ErrorRounded,
  WarningOutlined,
} from "@mui/icons-material";
import { AnimatePresence, motion } from "framer-motion";
import { StopCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo } from "react";
import { set } from "react-hook-form";

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
  const [currentSlide, setCurrentSlide] = React.useState<number>();

  const questionID = useMemo(() => {
    if (currentSlide === undefined) return;
    return SurveyEntries[currentSlide][0] as ID;
  }, [currentSlide]);

  const [nextButton, setNextButton] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const survey = getSurveyUtil();
    const index = getSurveyIndexUtil();

    setSurvey({ ...survey, metadata: { ...survey.metadata, started: true } });
    setCurrentSlide(index);
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
    if (currentSlide === undefined) return;
    setSurveyIndexUtil(currentSlide);
  }, [currentSlide]);

  const nextSlide = (force?: boolean) => {
    setCurrentSlide((index) => {
      if (index === SurveyEntries.length - 1 && force === true) {
        setIsSubmitted(true);
        setSurvey((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            metadata: {
              ...prev.metadata,
              finished: true,
            },
          };
        });
        return index;
      }
      setDirection(1);
      if (index === undefined) return 0;
      const nextSlideIndex = Math.min(index + 1, SurveyEntries.length - 1);

      return nextSlideIndex;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (!prev) return 0;
      if (prev === 0) return 0;
      return prev - 1;
    });
    setDirection(-1);
  };

  const handleSkip = useCallback(() => {
    if (!currentSlide) return;
    if (!survey) return;
    if (!questionID) return;

    if (survey.skipped.includes(questionID)) {
      return;
    }
    setSurvey((prev) => {
      if (!prev) return prev;
      const data = prev.data;
      delete data[questionID];

      return {
        ...prev,
        data,
        skipped: [...prev.skipped, questionID],
      };
    });
  }, [survey, currentSlide]);

  const [direction, setDirection] = React.useState(0);

  return (
    <SurveyContainer className="min-h-screen-nav overflow-hidden flex flex-col relative">
      {isLoading || currentSlide === undefined || !survey || !questionID ? (
        <div className="flex flex-1 items-center justify-center dark:bg-secondary/5 bg-primary/5">
          <div className="flex h-10 w-10 aspect-square border-4 rounded-full border-t-primary animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid-layout text-muted-foreground bg-muted dark:bg-primary/40 py-8 gap-4">
            <h2 className="text-center text-sm">
              Question {currentSlide + 1} of {SurveyEntries.length}
            </h2>
            <ProgressSurvey
              currentSlide={currentSlide}
              totalSlides={SurveyEntries.length - 1}
            />
          </div>
          <div className="flex flex-col flex-1">
            <SurveyView
              direction={direction}
              surveyID={questionID}
              className="flex flex-1 relative"
            >
              <AnimatePresence
                mode="popLayout"
                initial={false}
                custom={direction}
              >
                {survey.skipped.includes(questionID) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-warning top-4 left-4 text-start absolute font-bold w-full flex items-center gap-4"
                  >
                    <ErrorRounded className="w-10 h-10" /> You have skipped this
                    slide
                  </motion.div>
                )}
                <motion.div
                  key={currentSlide}
                  variants={variants}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="h-full relative w-full"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <SurveyParseInput
                    questionID={questionID}
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
      <div className="h-min flex justify-center items-center gap-4 md:gap-8 py-8">
        <SurveyButton
          variant={"default"}
          onClick={prevSlide}
          size={"lg"}
          icon={<ArrowBack />}
          disabled={isLoading || !currentSlide || currentSlide === 0}
        >
          <span className="min-w-[45px] flex justify-center">BACK</span>
        </SurveyButton>
        <SurveyButton
          disabled={isLoading}
          variant={"secondary"}
          size={"lg"}
          onClick={() => {
            handleSkip();
            nextSlide(true);
          }}
        >
          SKIP
        </SurveyButton>
        <SurveyButton
          disabled={!nextButton || isLoading}
          variant={
            !currentSlide || currentSlide < SurveyEntries.length - 1
              ? "default"
              : "success"
          }
          icon={<ArrowForward />}
          iconPosition="right"
          size={"lg"}
          onClick={() => {
            nextSlide(true);
          }}
        >
          <span className="min-w-[45px] flex justify-center">
            {!currentSlide || currentSlide < SurveyEntries.length - 1
              ? "NEXT"
              : "FINISH"}
          </span>
        </SurveyButton>
      </div>
    </SurveyContainer>
  );
};

export default SurveyPage;

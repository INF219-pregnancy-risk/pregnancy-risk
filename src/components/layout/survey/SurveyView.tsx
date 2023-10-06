"use client";

import LinkButton from "@/components/inputs/buttons/LinkButton";
import SurveyButton from "@/components/inputs/buttons/SurveyButton";
import { ID } from "@/types/RiskInput";
import { Survey } from "@/types/Survey";
import { resetSurveyUtil } from "@/utils/StoreSurvey";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";

export interface SurveyViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  nextButton: boolean;
  prevSlide: () => void;
  nextSlide: () => void;
  currentSlide: number;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
  surveyID: ID;
}
const SurveyView = ({
  children,
  nextButton,
  nextSlide,
  prevSlide,
  setSurvey,
  currentSlide,
  surveyID,
}: SurveyViewProps) => {
  const [skippedSlides, setSkippedSlides] = React.useState<ID[]>([]);

  useEffect(() => {
    setSurvey(
      (prev) =>
        ({
          ...prev,
          skipped: skippedSlides,
        } as Survey)
    );
  }, [skippedSlides, setSurvey]);

  return (
    <div className="flex flex-col w-full h-[600px] bg-gray-100 relative">
      <div className="w-full flex justify-end">
        <LinkButton
          href="/"
          className="bg-red-500 m-4 hover:bg-red-600 duration-200 active:scale-95 active:bg-red-400"
          onClick={resetSurveyUtil}
        >
          EXIT
        </LinkButton>
      </div>
      <section className="flex grow justify-center flex-col gap-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex w-full flex-col gap-8 items-center justify-center">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      <div className="grid grid-cols-3 items-center justify-items-center pb-8">
        <SurveyButton
          className="bg-blue-400 hover:bg-blue-500 duration-200 active:bg-blue-400 active:scale-95"
          onClick={prevSlide}
        >
          PREV
        </SurveyButton>
        <SurveyButton
          className="bg-gray-400 hover:bg-gray-500 duration-200 active:bg-gray-400 active:scale-95"
          onClick={() => {
            setSkippedSlides((prev) =>
              prev.includes(surveyID) ? prev : [...prev, surveyID]
            );
            nextSlide();
          }}
        >
          SKIP
        </SurveyButton>
        <SurveyButton
          disabled={!nextButton}
          onClick={() => {
            setSkippedSlides((prev) => prev.filter((i) => i !== surveyID));
            nextSlide();
          }}
          className="bg-blue-400 hover:bg-blue-500 duration-200 active:bg-blue-400 active:scale-95"
        >
          NEXT
        </SurveyButton>
      </div>
    </div>
  );
};

export default SurveyView;
"use client";

import SurveyButton from "@/components/inputs/buttons/SurveyButton";
import { RiskInputs, RiskType, Survey } from "@/types/RiskInput";
import { AnimatePresence, motion } from "framer-motion";
import { get } from "http";
import React, { useEffect } from "react";

export interface SurveyViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  nextButton: boolean;
  input: RiskInputs;
  prevSlide: () => void;
  nextSlide: () => void;
  currentSlide: number;
  setSurvey: React.Dispatch<React.SetStateAction<Survey>>;
}
const SurveyView = ({
  children,
  input,
  nextButton,
  nextSlide,
  prevSlide,
  setSurvey,
  currentSlide,
}: SurveyViewProps) => {
  const [skippedSlides, setSkippedSlides] = React.useState<number[]>([]);

  useEffect(() => {
    setSurvey((prev) => ({
      ...prev,
      skipped: skippedSlides,
    }));
  }, [skippedSlides]);

  return (
    <div className="flex flex-col w-full h-[600px] bg-gray-100 relative">
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
              <div>
                <h1 className="text-xl">{input.label}</h1>
                <i className="text-gray-500 text-sm">{getInfo(input)}</i>
              </div>
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
      <div className="grid grid-cols-3 items-center justify-items-center pb-8">
        <SurveyButton
          className="bg-blue-400 hover:bg-blue-500 duration-200"
          onClick={prevSlide}
        >
          PREV
        </SurveyButton>
        <SurveyButton
          className="bg-gray-400 hover:bg-gray-300 duration-200"
          onClick={() => {
            setSkippedSlides((prev) =>
              prev.includes(currentSlide) ? prev : [...prev, currentSlide]
            );
            nextSlide();
          }}
        >
          SKIP
        </SurveyButton>
        <SurveyButton
          disabled={!nextButton}
          onClick={() => {
            setSkippedSlides((prev) => prev.filter((i) => i !== currentSlide));
            nextSlide();
          }}
          className="bg-blue-400 hover:bg-blue-500 duration-200"
        >
          NEXT
        </SurveyButton>
      </div>
    </div>
  );
};

const getInfo = (input: RiskInputs) => {
  switch (input.type) {
    case RiskType.BOOLEAN:
      return null;
    case RiskType.CHOICE:
      return "Choose one";
    case RiskType.MULTIPLE:
      return "Choose multiple";
    case RiskType.INTEGER:
      return "Input a number";
    default:
      return null;
  }
};

export default SurveyView;

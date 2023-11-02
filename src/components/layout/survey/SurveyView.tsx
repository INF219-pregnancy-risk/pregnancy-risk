"use client";

import { cn } from "@/lib/utils";
import { ID } from "@/types/RiskInput";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export interface SurveyViewProps extends React.HTMLAttributes<HTMLDivElement> {
  surveyID: ID;
  direction: number;
}

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

const SurveyView = ({
  children,
  direction,
  surveyID,
  className,
  ...props
}: SurveyViewProps) => {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full dark:bg-secondary/5 bg-primary/5 relative",
        className
      )}
    >
      <section className="w-full grid-layout">
        <div className="flex w-full flex-col gap-8 items-center justify-center">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={surveyID}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              className="h-full relative w-full"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default SurveyView;

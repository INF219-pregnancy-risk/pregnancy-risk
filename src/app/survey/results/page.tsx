"use client";

import LinkButton from "@/components/inputs/buttons/LinkButton";
import ResultComponent from "@/components/inputs/survey/ResultComponent";
import { CID, CalculateRisk, Factors, ResultType } from "@/types/Conditions";
import { getSurveyUtil } from "@/utils/StoreSurvey";
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ResultsPage = () => {
  const [calculations, setCalculation] = React.useState<ResultType[]>([]);

  useEffect(() => {
    const survey = getSurveyUtil();
    const results = CalculateRisk(survey);
    setCalculation(results);
  }, []);

  return (
    <div className="grid-layout gap-4">
      <div className="w-full gap-6 flex flex-col h-max min-h-screen relative items-center justify-center">
        <AnimatePresence mode="wait">
          {calculations.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col gap-4 mt-8"
            >
              {calculations.map((res) => {
                return <ResultComponent id={res.id} value={res} />;
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col gap-4 justify-center items-center"
            >
              <div className="w-10 h-10 border-b-blue-500 border-black/20 border-[6px] rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="transition-opacity duration-300 flex gap-4 p-2 bg-gray-200 rounded-lg bottom-2 left-0 opacity-100 hover:opacity-100">
        <LinkButton href="/survey">Back</LinkButton>
        <LinkButton href="/">Home</LinkButton>
      </div>
    </div>
  );
};

export default ResultsPage;

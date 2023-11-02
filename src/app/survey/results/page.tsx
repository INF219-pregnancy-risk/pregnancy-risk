"use client";

import LinkButton from "@/components/inputs/buttons/LinkButton";
import ResultComponent from "@/components/inputs/survey/ResultComponent";
import { CID, CalculateRisk, Factors, ResultType } from "@/types/Conditions";
import { getSurveyUtil } from "@/utils/StoreSurvey";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";

const ResultsPage = () => {
  const [calculations, setCalculation] = React.useState<ResultType[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const survey = getSurveyUtil();
    const results = CalculateRisk(survey);
    setCalculation(results);
    setLoading(false);
  }, []);

  return (
    <div className="grid-layout gap-4">
      <div className="w-full gap-6 flex flex-col h-max min-h-screen-nav relative items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {!loading ? (
            <>
              <h1 className="mt-14 font-bold text-3xl">Your risk assessment</h1>
              <motion.div
                key={"calculation"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full grid grid-cols-1 gap-4 mt-8"
              >
                {calculations
                  .sort((a, b) => (a.risk >= b.risk ? -1 : 1))
                  .map((res) => {
                    return (
                      <ResultComponent id={res.id} value={res} key={res.id} />
                    );
                  })}
              </motion.div>
            </>
          ) : (
            <motion.div
              key={"loading"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col gap-4 justify-center items-center"
            >
              <div className="w-10 h-10 border-t-primary border-[6px] rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="transition-opacity duration-300 mb-4 mx-auto flex gap-4 p-2 bg-muted text-muted-foreground rounded-lg shadow hover:shadow-md justify-center">
        <LinkButton href="/survey">Back</LinkButton>
        <LinkButton href="/">Home</LinkButton>
      </div>
    </div>
  );
};

export default ResultsPage;

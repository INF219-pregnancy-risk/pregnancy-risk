"use client";

import { CID, Conditions, ResultType } from "@/types/Conditions";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
interface ResultComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: CID;
  value: ResultType;
}

const ResultComponent = ({ id, value }: ResultComponentProps) => {
  const condition = Conditions[id];
  const { low, increased, moderate, high } = condition.riskScore;
  const max = value.max;
  const steps = 100 / max;

  const [hovering, setHovering] = React.useState(false);

  return (
    <div className="relative w-full min-h-[150px] flex flex-col bg-slate-300 flex-1 rounded-md p-2">
      <h1 className="mb-8 text-xl font-bold">{condition.name}</h1>
      {value.missingFactors.length > 0 && (
        <div
          className="flex top-0 right-0 m-2 items-center justify-center absolute"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
          <AnimatePresence>
            {hovering && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0 }}
                className="overflow-hidden min-w-[150px] min-h-[75px] z-50 top-0 right-0 translate-y-full flex flex-col justify-center bg-gray-100 rounded-md p-2 absolute"
              >
                <span className="text-sm font-bold mb-2 text-center">
                  Missing Factors
                </span>
                <i className="text-[10px] mb-2 text-gray-400">
                  The factors below are missing from your survey. They will
                  affect your risk score.
                </i>
                {value.missingFactors.map((factor) => (
                  <span className="text-xs mb-1 font-bold" key={factor}>
                    {factor}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <div className="w-full flex rounded-full h-2 bg-gray-200 relative">
        <motion.div
          className="h-full absolute rounded-l-full bg-blue-400"
          style={{
            left: `${0}%`,
            width: `${low * steps}%`,
          }}
        >
          <span className="absolute right-0 translate-x-1/2 bottom-3">
            {low}
          </span>
        </motion.div>
        <motion.div
          className="h-full absolute bg-green-400"
          style={{
            left: `${low * steps}%`,
            width: `${increased * steps - low * steps}%`,
          }}
        >
          <span className="absolute right-0 translate-x-1/2 bottom-3">
            {increased}
          </span>
        </motion.div>
        <motion.div
          className="h-full absolute bg-yellow-400"
          style={{
            left: `${increased * steps}%`,
            width: `${moderate * steps - increased * steps}%`,
          }}
        >
          <span className="absolute right-0 translate-x-1/2 bottom-3">
            {moderate}
          </span>
        </motion.div>
        <motion.div
          className="h-full absolute bg-red-400"
          style={{
            left: `${moderate * steps}%`,
            width: `${high * steps - moderate * steps}%`,
          }}
        >
          <span className="absolute right-0 translate-x-1/2 bottom-3">
            {high}
          </span>
        </motion.div>
        <motion.div
          className="h-full absolute rounded-r-full bg-red-900"
          style={{
            left: `${high * steps}%`,
            width: `${max * steps - high * steps}%`,
          }}
        ></motion.div>
        <motion.div className="h-full w-full relative" style={{}}>
          <ArrowUpIcon
            className="h-8 w-8 absolute top-0 text-black -translate-x-1/2"
            style={{
              left: `${value.risk * steps}%`,
              top: "120%",
            }}
          />
        </motion.div>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl">{value.risk}</span>
          <span className="flex items-center justify-center">
            {value.risk >= high
              ? "Very High "
              : value.risk >= moderate
              ? "High "
              : value.risk >= increased
              ? "Moderate "
              : value.risk >= low
              ? "Increased "
              : "Low "}
          </span>
        </div>
        <div className="text-sm text-gray-500">Risk Score</div>
      </div>
      <div className="flex flex-col items-center justify-center my-2">
        <div className="flex flex-row items-center justify-center">
          <span className="text-sm ml-2">{condition.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;

"use client";

import AccordationResult from "../info/AccordionResult";
import Popover from "@/components/ui/popover";
import { CID, Conditions, ResultType } from "@/types/Conditions";
import { getRegularNameForId } from "@/types/RiskInput";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { default as ArrowUpIcon } from "@mui/icons-material/ArrowUpward";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

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

  const calculationContent = Object.entries(value.increasedBy)
    .map(([factor, amount]) => `${factor}: ${amount}`)
    .join(" + ")
    .trim();

  const getRiskColorClass = (risk: number) => {
    if (risk >= high) return "text-red-900";
    if (risk >= moderate) return "text-destructive";
    if (risk >= increased) return "text-warning";
    if (risk >= low) return "text-success";
    return "text-primary";
  };

  return (
    <div className="relative w-full min-h-[150px] flex flex-col bg-primary/5 flex-1 rounded-md p-8">
      <h1 className="mb-8 text-xl font-bold">{condition.name}</h1>
      {value.missingFactors.length > 0 && (
        <>
          <Popover
            button={
              <ExclamationTriangleIcon className="h-8 w-8 text-warning" />
            }
            title="Missing Factors"
            description="The factors below are missing from your survey. They will affect your risk score."
            className="top-2 right-2 m-2 absolute"
          >
            {value.missingFactors.map((factor) => (
              <span className="text-xs mb-1 font-bold" key={factor}>
                {getRegularNameForId(factor)}
              </span>
            ))}
          </Popover>
        </>
      )}
      <div className="w-full flex rounded-full h-2 bg-gray-200 relative">
        <motion.div
          className="h-full absolute rounded-l-full bg-primary"
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
          className="h-full absolute bg-success"
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
          className="h-full absolute bg-warning"
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
          className="h-full absolute bg-destructive"
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
            className="h-auto aspect-square absolute text-foreground -translate-x-1/2"
            style={{
              left: `${value.risk * steps}%`,
              top: "0.5rem",
              width: "1.5rem",
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
        <div className="grid grid-cols-1 items-center justify-center text-center w-full">
          <AccordationResult
            header={"Description of " + condition.name}
            content={condition.description}
            className="my-2"
          />

          <AccordationResult
            key="calculation-accordion"
            header="Calculation for this complication"
            content={
              <span
                className={`text-md font-medium bg-primary-100 rounded-lg p-2 shadow`}
              >
                {calculationContent + " = "}
                <span
                  className={`text-lg font-semibold ${getRiskColorClass(
                    value.risk
                  )}`}
                >
                  {value.risk}
                </span>
              </span>
            }
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;

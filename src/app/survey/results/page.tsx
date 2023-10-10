"use client";

import LinkButton from "@/components/inputs/buttons/LinkButton";
import { Survey } from "@/types/Survey";
import { getSurveyUtil } from "@/utils/StoreSurvey";
import React from "react";

const ResultsPage = () => {
  const survey = {
    data: {
      age: 34,
      weight: 65,
      height: 180,
      polycysticOvarySyndrome: true,
      highBloodPressure: true,
      familyHistoryHypertension: true,
      familyHistoryDiabetes: false,
      activity: { walking: false, running: true, swimming: true },
      etnisity: "white",
    },
    skipped: ["diabetes"],
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center h-screen gap-8">
      <h1>Results</h1>
      <p className="break-words">
        You answered: {parse(getSurveyUtil()?.data)}
      </p>
      <p className="break-words">
        You skipped: {JSON.stringify(getSurveyUtil()?.skipped)}
      </p>
      <p>Thank you for taking the survey!</p>

      <LinkButton href="/survey">Back to survey</LinkButton>
      <LinkButton href="/">Back to home</LinkButton>
    </div>
  );
};

const parse = (data: object | undefined) => {
  return Object.entries(data || {}).map(([key, value]) => {
    if (typeof value === "object") {
      return (
        <p key={key}>
          <span
            style={{
              color: "orange",
            }}
          >
            {key}
          </span>
          : {"{"}
          <div style={{ marginLeft: "1rem" }}>{parse(value)}</div>
          {"}"}
        </p>
      );
    }
    return (
      <p key={key}>
        <span
          style={{
            color: "blue",
          }}
        >
          {key}
        </span>
        {`: ${value}`}
      </p>
    );
  });
};

export default ResultsPage;

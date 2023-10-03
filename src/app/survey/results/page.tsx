"use client";

import LinkButton from "@/components/inputs/buttons/LinkButton";
import { getSurveyUtil } from "@/utils/StoreSurvey";
import React from "react";

const ResultsPage = () => {
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
        <p style={{ marginLeft: "1rem" }}>
          {key}: {parse(value)}
        </p>
      );
    }
    return <p>{`${key}: ${value}`}</p>;
  });
};

export default ResultsPage;

"use client";

import { Survey } from "@/types/RiskInput";
import { useRouter } from "next/router";

export const setLocalStorage = (key: string, value: string) => {
  if (localStorage === undefined) return 0;
  try {
    localStorage.setItem(key, value);
    return 1;
  } catch (e) {
    return 0;
  }
};

export const getLocalStorage = (key: string) => {
  if (localStorage === undefined) return null;

  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const setSurveyUtil = (survey: Survey) => {
  return setLocalStorage("survey", JSON.stringify(survey));
};

export const getSurveyUtil = (): Survey | null => {
  const survey = getLocalStorage("survey");

  if (!survey) return null;
  try {
    return JSON.parse(survey);
  } catch (e) {
    return null;
  }
};

export const setSurveyIndexUtil = (index: number) => {
  return setLocalStorage("surveyIndex", index.toString());
};

export const getSurveyIndexUtil = (): number => {
  const index = getLocalStorage("surveyIndex");

  if (!index) return 0;
  try {
    return parseInt(index);
  } catch (e) {
    return 0;
  }
};

export const resetSurveyUtil = () => {
  localStorage.removeItem("survey");
  localStorage.removeItem("surveyIndex");
};

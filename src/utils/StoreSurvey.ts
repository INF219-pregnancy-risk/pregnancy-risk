"use client";

import { Survey } from "@/types/RiskInput";

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window === "undefined") return 0;
  try {
    localStorage.setItem(key, value);
    return 1;
  } catch (e) {
    return 0;
  }
};

export const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window === "undefined") return 0;

  try {
    localStorage.removeItem(key);
    return 1;
  } catch (e) {
    return 0;
  }
};

export const setSurveyUtil = (survey: Survey) => {
  return setLocalStorage("survey", JSON.stringify(survey));
};

export const getSurveyUtil = (): Survey => {
  const survey = getLocalStorage("survey");

  const def = { data: {}, subQuestion: {}, slides: [] } as Survey;

  if (!survey) return def;
  try {
    return JSON.parse(survey) as Survey;
  } catch (e) {
    return def;
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
  removeLocalStorage("survey");
  removeLocalStorage("surveyIndex");
};

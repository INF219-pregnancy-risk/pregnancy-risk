"use client";

import { Survey, SurveyEntries } from "@/types/Survey";

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;

    return v.toString(16);
  });
};

export const DefaultMetadata: Survey["metadata"] = {
  version: "1.0.0",
  date: new Date().toISOString(),
  id: uuid(),
  finished: false,
  started: false,
  disclamer: false,
};

export const DefaultSurvey: Survey = {
  data: {},
  skipped: [],
  metadata: DefaultMetadata,
};

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

  if (!survey) {
    resetSurveyUtil();
    return DefaultSurvey;
  }

  try {
    const parsed = JSON.parse(survey) as Survey;

    if (parsed.metadata?.version !== DefaultMetadata.version) {
      resetSurveyUtil();
      return DefaultSurvey;
    }

    return parsed;
  } catch (e) {
    return DefaultSurvey;
  }
};

export const setSurveyIndexUtil = (index: number) => {
  return setLocalStorage("surveyIndex", index.toString());
};

export const getSurveyIndexUtil = (goToIndex?: number): number => {
  if (typeof goToIndex === "number") {
    setSurveyIndexUtil(goToIndex);
  }

  const index = getLocalStorage("surveyIndex");

  if (!index) return 0;
  try {
    const indexNumber = parseInt(index);
    if (isNaN(indexNumber)) return 0;
    if (indexNumber < 0) return 0;
    if (indexNumber > SurveyEntries.length - 1) return 0;
    return indexNumber;
  } catch (e) {
    return 0;
  }
};

export const resetSurveyUtil = () => {
  try {
    removeLocalStorage("survey");
    removeLocalStorage("surveyIndex");
    setSurveyUtil(DefaultSurvey);
    setSurveyIndexUtil(0);
  } catch (e) {
    return false;
  }

  return true;
};

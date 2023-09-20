"use client";

import SurveyInput from "@/components/inputs/SurveyInput";
import { SurveySlides } from "@/data/Survey";
import {
  addToLocalSurvey,
  getSurvery,
  getSurveryIndex,
  setLocalIndex,
  setLocalSurvey,
} from "@/utility/store";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const page = () => {
  const [survey, setSurvey] = useState<object>(getSurvery());
  const [surveyIndex, setSurveyIndex] = useState<number>(getSurveryIndex());
  const router = useRouter();
  useEffect(() => {
    setLocalIndex(surveyIndex);
  }, [surveyIndex]);

  return (
    <div className="w-full h-screen flex flex-col gap-20 items-center justify-center">
      <div className="absolute w-full h-20 bg-blue-300 right-0 top-0 items-center justify-center flex px-32">
        <h1 className=" absolute left-5 text-4xl font-bold text-white">
          Survey
        </h1>
        <button
          className="absolute right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex w-28 justify-center items-center duration-500 transition-opacity select-none"
          onClick={() => {
            localStorage.setItem("survey", "{}");
            localStorage.setItem("surveyIndex", "0");
            router.push("/");
          }}
        >
          EXIT
        </button>
        <div
          className="relative h-10 bg-white w-[500px] rounded-full overflow-hidden shadow-lg"
          style={{
            outline: "3px solid black",
          }}
        >
          <div
            className="absolute left-0 h-full bg-blue-500 transition-all duration-300 items-center justify-center flex overflow-hidden"
            style={{
              borderRadius: "0 50px 50px 0",
              width: `${(surveyIndex / (SurveySlides.length - 1)) * 100}%`,
            }}
          >
            <span className="text-center font-bold text-white w-full">
              {(surveyIndex / (SurveySlides.length - 1)) * 100}%
            </span>
          </div>
        </div>
      </div>
      <div className="bg-[#333] text-white flex w-[786px] h-96 rounded-lg shadow-2xl relative">
        {SurveySlides.map(({ inputs }, index) => (
          <div
            key={index}
            className="absolute duration-200 transition-all w-full h-full"
            style={
              surveyIndex === index
                ? {
                    opacity: 1,
                    pointerEvents: "all",
                    transitionDelay: "0.2s",
                  }
                : {
                    opacity: 0,
                    pointerEvents: "none",
                  }
            }
          >
            {inputs.map(({ id, label }, index) => {
              return (
                <SurveyInput
                  key={id}
                  id={id}
                  setSurvey={setSurvey}
                  survey={survey}
                />
              );
            })}
          </div>
        ))}
      </div>

      <span className="flex gap-5 bottom-0 right-1/2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex w-28 justify-center items-center duration-500 transition-opacity select-none"
          style={surveyIndex === 0 ? { opacity: 0, pointerEvents: "none" } : {}}
          onClick={() => {
            PreviousSlide(setSurveyIndex);
          }}
          disabled={surveyIndex === 0}
        >
          Previous
        </button>

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg flex w-28 justify-center items-center duration-500 transition-opacity select-none"
          style={
            surveyIndex === SurveySlides.length - 1
              ? { opacity: 0.1, pointerEvents: "none" }
              : {}
          }
          onClick={() => {
            SkipSlide(setSurveyIndex);
          }}
        >
          Skip
        </button>

        <button
          className="text-white px-4 py-2 rounded-lg shadow-lg flex w-28 justify-center items-center select-none transition-colors duration-500"
          style={
            surveyIndex === SurveySlides.length - 1
              ? { backgroundColor: "#4caf50" }
              : { backgroundColor: "#2196f3" }
          }
          onClick={() => {
            if (surveyIndex === SurveySlides.length - 1) {
              setLocalSurvey(survey);
              router.push("/survey/results");
            } else {
              NextSlide(setSurveyIndex, survey);
            }
          }}
        >
          {surveyIndex === SurveySlides.length - 1 ? "Submit" : "Next"}
        </button>
      </span>
    </div>
  );
};

const SkipSlide = (setSurveyIndex: Dispatch<SetStateAction<number>>) => {
  setSurveyIndex((e) => {
    return Math.min(e + 1, SurveySlides.length - 1);
  });
};

const PreviousSlide = (setSurveyIndex: Dispatch<SetStateAction<number>>) => {
  setSurveyIndex((e) => {
    return Math.max(e - 1, 0);
  });
};

const NextSlide = (
  setSurveyIndex: Dispatch<SetStateAction<number>>,
  survey: object
) => {
  setSurveyIndex((e) => {
    return Math.min(e + 1, SurveySlides.length - 1);
  });
  addToLocalSurvey(survey);
};

export default page;

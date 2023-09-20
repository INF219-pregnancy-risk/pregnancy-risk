"use client";
import { getPreviousSurveys } from "@/utility/store";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="h-full items-center justify-center flex flex-col">
      <h1 className="text-3xl font-bold pb-10">Survey History</h1>
      <div className="flex pb-10 flex-col gap-3">
        {getPreviousSurveys() != null &&
        getPreviousSurveys() != undefined &&
        localStorage.getItem("previousSurveys") != "{}" ? (
          Object.entries(getPreviousSurveys()).map(
            ([key, { date, survey }]) => {
              return (
                <Link
                  key={key}
                  href={`/survey/history/${key}`}
                  className="bg-blue-200 text-gray-600 p-4 rounded-md shadow-md text-center w-max"
                >
                  time: {new Date(date).toLocaleTimeString()} - date:{" "}
                  {new Date(date).toLocaleDateString()} - id: {key}
                </Link>
              );
            }
          )
        ) : (
          <p className="text-xl">No previous surveys</p>
        )}
      </div>
      <div>
        <Link
          href="/"
          className="bg-blue-500 text-white p-4 rounded-md shadow-md text-3xl w-72 text-center mt-10"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default page;

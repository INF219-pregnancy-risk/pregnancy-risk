"use client";
import { getPreviousSurveys, resetSurvey } from "@/utility/store";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 justify-center">
      <h1 className="text-3xl font-bold">Survey App</h1>
      <p className="text-xl">
        This is a survey app that uses local storage to store the survey
        results.
      </p>
      <p className="text-xl">
        The survey is a series of questions that are answered with either a yes
        or no, or a number.
      </p>
      <p className="text-xl">
        The survey results are stored in local storage, and can be viewed at any
        time.
      </p>
      <Link
        href="/survey"
        className="bg-blue-500 text-white p-4 rounded-md shadow-md text-3xl"
        onClick={() => {
          resetSurvey();
        }}
      >
        Go to survey
      </Link>

      {localStorage.getItem("survey") != "{}" &&
        localStorage.getItem("survey") != null && (
          <Link
            href="/survey/results"
            className="bg-blue-200 text-gray-600 p-4 rounded-md shadow-md text-3xl"
          >
            View last results
          </Link>
        )}

      <Link
        className="bg-blue-200 text-gray-600 p-4 rounded-md shadow-md text-3xl"
        href="/survey/history"
      >
        View Survey History
      </Link>
    </main>
  );
}

"use client";

import { resetSurvey } from "@/utility/store";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 justify-center">
      <h1 className="text-3xl font-bold">Survey Results</h1>
      <p>
        Survey:{" "}
        {JSON.stringify(
          removeEmpty(JSON.parse(localStorage.getItem("survey")))
        )}
      </p>
      <div className="flex gap-4">
        <Link
          className="bg-blue-200 text-gray-600 p-4 rounded-md shadow-md text-3xl w-72 text-center"
          href="/survey"
          onClick={() => {
            resetSurvey();
          }}
        >
          Take survey again
        </Link>
        <Link
          href="/"
          className="bg-blue-500 text-white p-4 rounded-md shadow-md text-3xl w-72 text-center"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

const removeEmpty = (obj) => {
  if (obj == null) return obj;
  if (typeof obj !== "object") return obj;
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]);
    else if (obj[key] == null || obj[key] == "") delete obj[key];
  });
  return obj;
};

export default page;

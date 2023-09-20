"use client";

import { getPreviousSurveys } from "@/utility/store";
import Link from "next/link";
import React from "react";

const page = ({ params, searchParams }) => {
  console.log(getPreviousSurveys()[params.id].survey);
  return (
    <div>
      <pre className="pb-10">
        {JSON.stringify(getPreviousSurveys()[params.id].survey)}
      </pre>
      <Link
        href="/survey/history"
        className="bg-blue-500 text-white p-4 rounded-md shadow-md text-3xl w-72 text-center mt-10"
      >
        Go back to history
      </Link>
    </div>
  );
};

export default page;

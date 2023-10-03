import PageWarpper from "@/components/layout/PageWarpper";
import Link from "next/link";
import React from "react";

const SurveyPage = () => {
  return (
    <PageWarpper>
      <h1 className="pb-4">You are at survey</h1>
      <Link
        href={"/survey/results"}
        className="bg-blue-500 py-2 px-4 rounded-md text-white"
      >
        Submit
      </Link>
    </PageWarpper>
  );
};

export default SurveyPage;

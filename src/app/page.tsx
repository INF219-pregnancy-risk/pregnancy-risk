"use client";

import LinkButton from "@/components/inputs/buttons/LinkButton";
import SurveyButton from "@/components/inputs/buttons/SurveyButton";
import { ID, TYPE } from "@/types/RiskInput";
import { resetSurveyUtil } from "@/utils/StoreSurvey";

import React from "react";

export default function Home() {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  console.log(TYPE[ID.ACTIVITY]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 justify-center">
      <LinkButton href="/survey" onClick={resetSurveyUtil}>
        Goto Survey
      </LinkButton>
      <div className="grid grid-cols-3 gap-4">
        <div className="gap-2 flex">
          <label htmlFor="checked">Checked</label>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </div>
        <div className="gap-2 flex">
          <label htmlFor="loading">Loading</label>
          <input
            type="checkbox"
            checked={loading}
            onChange={(e) => setLoading(e.target.checked)}
          />
        </div>
        <div className="gap-2 flex">
          <label htmlFor="disabled">Disabled</label>
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
        </div>
      </div>

      <SurveyButton
        size="large"
        checked={checked}
        loading={loading}
        disabled={disabled}
        onClick={resetSurveyUtil}
      >
        Start Survey
      </SurveyButton>
      <SurveyButton
        size="medium"
        checked={checked}
        loading={loading}
        disabled={disabled}
        onClick={resetSurveyUtil}
      >
        Start Survey
      </SurveyButton>
      <SurveyButton
        size="small"
        checked={checked}
        loading={loading}
        disabled={disabled}
        onClick={resetSurveyUtil}
      >
        Start Survey
      </SurveyButton>
    </main>
  );
}

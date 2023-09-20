import { SurveyInputTypes, SurveyInputs } from "@/data/Survey";
import React from "react";

interface SurveyInputProps extends React.HTMLAttributes<HTMLDivElement> {
  setSurvey: React.Dispatch<React.SetStateAction<object>>;
  survey: object;
}

const SurveyInput = ({ survey, setSurvey, id, ...props }: SurveyInputProps) => {
  const input = SurveyInputs[id];

  switch (input.type) {
    case SurveyInputTypes.BOOLEAN:
      return (
        <div
          {...props}
          className="flex flex-col w-full justify-center items-center h-full gap-10"
        >
          <label htmlFor={id} className="text-xl">
            {input.label}
          </label>
          <div className="flex gap-5">
            <button
              className="bg-blue-500 text-white p-4 rounded-md shadow-md text-lg w-36"
              style={
                survey[id]
                  ? {
                      outline: "solid 2px rgb(109 180 255)",
                      outlineOffset: "2px",
                    }
                  : {
                      outline: "none",
                    }
              }
              onClick={() => setSurvey((prev) => ({ ...prev, [id]: true }))}
            >
              YES
            </button>
            <button
              className="bg-gray-500 text-white p-4 rounded-md shadow-md text-lg w-36"
              onClick={() => setSurvey((prev) => ({ ...prev, [id]: false }))}
              style={
                survey[id]
                  ? { outline: "none" }
                  : {
                      outline: "solid 2px rgb(107 114 128)",
                      outlineOffset: "2px",
                    }
              }
            >
              NO
            </button>
          </div>
        </div>
      );
    case SurveyInputTypes.INTEGER:
      return (
        <div {...props}>
          <label htmlFor={id}>{input.label}</label>
          <input
            type="number"
            id={id}
            value={survey[id]}
            onChange={(e) =>
              setSurvey((prev) => ({ ...prev, [id]: e.target.value }))
            }
          />
        </div>
      );
    case SurveyInputTypes.INTEGER_RANGE:
      return (
        <div {...props}>
          <label htmlFor={id}>{input.label}</label>
          <input
            type="range"
            id={id}
            value={survey[id]}
            min={input.data.min}
            max={input.data.max}
            onChange={(e) =>
              setSurvey((prev) => ({ ...prev, [id]: e.target.value }))
            }
          />
        </div>
      );
    case SurveyInputTypes.CHOICE:
      return (
        <div {...props}>
          <label htmlFor={id}>{input.label}</label>
          <select
            id={id}
            value={survey[id]}
            onChange={(e) =>
              setSurvey((prev) => ({ ...prev, [id]: e.target.value }))
            }
            className="text-black"
          >
            {input.data.choices.map((choice) => (
              <option value={choice} key={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>
      );
    case SurveyInputTypes.CHOICE_MULTIPLE:
      return (
        <div {...props}>
          <label htmlFor={id}>{input.label}</label>
          {input.data.choices?.map((choice) => (
            <div className="flex gap-5" key={choice}>
              <input
                type="checkbox"
                id={choice}
                checked={survey[id] ? survey[id][choice] : false}
                onChange={(e) =>
                  setSurvey((prev) => ({
                    ...prev,
                    [id]: {
                      ...prev[id],
                      [choice]: e.target.checked,
                    },
                  }))
                }
              />
              <label htmlFor={choice}>{choice}</label>
            </div>
          ))}
        </div>
      );
  }
};

export default SurveyInput;

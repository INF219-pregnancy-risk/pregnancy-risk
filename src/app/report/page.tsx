"use client";

import React, { useState } from "react";

function ReportProblem() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send the feedback, for example, to an API endpoint
    setSubmitted(true);
  };

  const isSubmitDisabled = !feedback.trim();

  return (
    <div className="p-8 w-full">
      <div className="p-8 max-w-[600px] mx-auto container shadow-lg rounded-lg">
        <h1 className="text-3xl mb-4">Report a Problem 😲</h1>
        {submitted ? (
          <p>Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="feedback"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Your Feedback:
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows={6}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>

            <button
              disabled={isSubmitDisabled}
              type="submit"
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ReportProblem;

const getSurvery = () => {
  const survey = localStorage.getItem("survey");
  try {
    return JSON.parse(survey);
  } catch (e) {
    return {};
  }
};

const setLocalSurvey = (survey: object) => {
  const last = localStorage.getItem("survey");
  try {
    localStorage.setItem("survey", JSON.stringify(survey));
  } catch (e) {
    localStorage.setItem("survey", last);
  }
};

const addToLocalSurvey = (survey: object) => {
  const last = localStorage.getItem("survey");
  try {
    localStorage.setItem(
      "survey",
      JSON.stringify({
        ...JSON.parse(last),
        ...survey,
      })
    );
  } catch (e) {
    localStorage.setItem("survey", last);
  }
};

const getSurveryIndex = () => {
  const surveyIndex = localStorage.getItem("surveyIndex");
  try {
    return parseInt(surveyIndex);
  } catch (e) {
    return 0;
  }
};

const setLocalIndex = (surveyIndex: number) => {
  const last = localStorage.getItem("surveyIndex");
  try {
    localStorage.setItem("surveyIndex", surveyIndex.toString());
  } catch (e) {
    localStorage.setItem("surveyIndex", last);
  }
};

const resetSurvey = () => {
  if (!localStorage.getItem("previousSurveys")) {
    localStorage.setItem("previousSurveys", "{}");
  }
  try {
    const survey = localStorage.getItem("survey");
    const parsed = JSON.parse(survey);
    if (parsed != null && parsed != undefined && survey !== "{}") {
      const lastSurvey = localStorage.getItem("previousSurveys");
      const lastSurveyParsed = JSON.parse(lastSurvey);
      localStorage.setItem(
        "previousSurveys",
        JSON.stringify({
          [uuidv4()]: {
            survey: parsed,
            date: new Date().toISOString(),
          },
          ...lastSurveyParsed,
        })
      );
    }
  } catch (e) {
    alert("Error saving survey");
  }

  localStorage.setItem("survey", "{}");
  localStorage.setItem("surveyIndex", "0");
};

const getPreviousSurveys = (): object => {
  const previousSurveys = localStorage.getItem("previousSurveys");
  try {
    return JSON.parse(previousSurveys);
  } catch (e) {
    return {};
  }
};

const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    // eslint-disable-next-line
    var r = (Math.random() * 16) | 0,
      // eslint-disable-next-line
      v = c == "x" ? r : (r & 0x3) | 0x8;
    // eslint-disable-next-line
    return v.toString(16);
  });
};

export {
  getSurvery,
  setLocalSurvey,
  addToLocalSurvey,
  getSurveryIndex,
  setLocalIndex,
  resetSurvey,
  getPreviousSurveys,
};

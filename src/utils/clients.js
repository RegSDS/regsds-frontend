import axios from "axios";

export const client = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
  withCredentials: true,
});

const postGradeCalculator = async (data) => {
  const response = await client.post(
    process.env.REACT_APP_COURSE_SCHEDULER_URL + "gpa",
    data,
    {
      withCredentials: true,
    }
  );
  return response;
};

const postGradeAssessment = async (data) => {
  const response = await client.post(
    process.env.REACT_APP_GRADE_ASSESSMENT_URL + "grade/assessment",
    data,
    {
      withCredentials: true,
    }
  );
  return response;
};

const getCourseList = async () => {
  const response = await client.get(
    process.env.REACT_APP_COURSE_SCHEDULER_URL + "course"
  );
  return response;
};

const genPDF = async (data) => {
  const response = await axios.post(
    process.env.REACT_APP_PDF_GENERATOR_URL + "generate-pdf/grade-calculator",
    data,
    { responseType: "arraybuffer" }
  );
  return response;
};

export const apiClient = {
  postGradeCalculator,
  postGradeAssessment,
  getCourseList,
  genPDF,
};

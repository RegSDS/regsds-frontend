import axios from "axios";

const postGradeCalculator = async (data) => {
  const response = await axios.post(
    process.env.REACT_APP_GRADE_CALCULATOR_URL + "/gpa",
    data,
  );
  return response;
};

const postGradeAssessment = async (data) => {
  const response = await axios.post(
    process.env.REACT_APP_GRADE_ASSESSMENT_URL + "/gradeAssessment",
    data,
  );
  return response;
};

const getCourseList = async () => {
  const response = await axios.get(
    process.env.REACT_APP_COURSE_SCHEDULER_URL + "/courses"
  );
  return response;
};

const genPDFGradeCalculator = async (data) => {
  const response = await axios.post(
    process.env.REACT_APP_PDF_GENERATOR_URL + "/generate-pdf/grade-calculator",
    data,
    { responseType: "arraybuffer" }
  );
  return response;
};

const genPDFGradeAssessment = async (data) => {
  const response = await axios.post(
    process.env.REACT_APP_PDF_GENERATOR_URL + "/generate-pdf/grade-assessment",
    data,
    { responseType: "arraybuffer" }
  );
  return response;
};

export const apiClient = {
  postGradeCalculator,
  postGradeAssessment,
  getCourseList,
  genPDFGradeCalculator,
  genPDFGradeAssessment,
};

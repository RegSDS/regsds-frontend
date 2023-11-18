export const client = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

const postGradeCalculator = async (data) => {
  const response = await client.post("/grade", data);
  return response;
};

const postGradeAssessment = async (data) => {
  const response = await client.post("/grade/assessment", data);
  return response;
};

const getCourseList = async () => {
  const response = await client.get("/course");
  return response;
};

export const apiClient = {
  postGradeCalculator,
  postGradeAssessment,
};

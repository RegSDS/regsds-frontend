import React, { useState } from "react";
import PdfDownloadButton from "../components/PdfDownloadButton";

const fileUrl =
  "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2023_1/35359/materials/SDS_2023_Project-172259-16974308330695.pdf";

const GradeAssessment = () => {
  const [studentScore, setStudentScore] = useState([
    { id: "", score: 0 },
  ]);

  const [criteria, setCriteria] = useState([
    { criteria: "A", score: 80 },
    { criteria: "B+", score: 75 },
    { criteria: "B", score: 70 },
    { criteria: "C+", score: 65 },
    { criteria: "C", score: 60 },
    { criteria: "D+", score: 55 },
    { criteria: "D", score: 50 },
    { criteria: "F", score: 0 },
  ]);

  const [gradingType, setGradingType] = useState("group"); // 'group' or 'criteria'

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleScoreChange = (index, event) => {
    let { name, value } = event.target;
    if (name === "score" && value > 100) {
      value = 100;
    }
    const newData = [...studentScore];
    newData[index] = { ...newData[index], [name]: value };
    setStudentScore(newData);
    console.log(newData);
  };

  const handleCriteriaChange = (index, e) => {
    const updatedCriteria = [...criteria];
    updatedCriteria[index] = {
      ...updatedCriteria[index],
      score: parseInt(e.target.value, 10),
    };

    // Check if the lower grade can't be more than the higher grade
    if (
      index > 0 &&
      updatedCriteria[index].score >= updatedCriteria[index - 1].score
    ) {
      // Prevent updating the state if the condition is not met
      return;
    }

    setCriteria(updatedCriteria);
  };

  const addScoreRow = () => {
    setStudentScore([...studentScore, { id: "", score: "0" }]);
  };

  const handleGradingTypeChange = (type) => {
    setGradingType(type);
  };

  const onSubmit = () => {
    const result = {
      studentScore: studentScore,
      criteria: {
        isGroup: gradingType === "group",
        A_score: criteria[0].score,
        B_plus_score: criteria[1].score,
        B_score: criteria[2].score,
        C_plus_score: criteria[3].score,
        C_score: criteria[4].score,
        D_plus_score: criteria[5].score,
        D_score: criteria[6].score,
        F_score: criteria[7].score,
      },
    };
    console.log(result);
    setIsSubmitted(!isSubmitted);
  };

  return (
    <div className="container">
      <h1>Grade Assessment</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Student Id</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {studentScore.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="id"
                  value={score.id}
                  onChange={(e) => handleScoreChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="score"
                  value={score.score}
                  max="100"
                  onChange={(e) => handleScoreChange(index, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: "10px" }} onClick={addScoreRow}>
        Add Row
      </button>
      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="radio"
            value="group"
            checked={gradingType === "group"}
            onChange={() => handleGradingTypeChange("group")}
          />
          Group
        </label>
        <label>
          <input
            type="radio"
            value="criteria"
            checked={gradingType === "criteria"}
            onChange={() => handleGradingTypeChange("criteria")}
          />
          Criteria
        </label>
      </div>
      {gradingType === "criteria" && (
        <div style={{ marginTop: "20px" }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Grade</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criteria, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      disabled
                      type="text"
                      name="criteria"
                      value={criteria.criteria}
                      onChange={(e) => handleCriteriaChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="score"
                      value={criteria.score}
                      max="100"
                      onChange={(e) => handleCriteriaChange(index, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button style={{ marginTop: "20px" }} onClick={onSubmit}>
        Submit
      </button>
      {isSubmitted && (
        <>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Student Id</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {/* change studentScore to result */}
              {studentScore.map((score, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      disabled
                      type="text"
                      name="id"
                      value={score.id}
                      onChange={(e) => handleScoreChange(index, e)}
                    />
                  </td>
                  <td>
                    <input
                      disabled
                      type="number"
                      name="grade"
                      value={score.score}
                      max="100"
                      onChange={(e) => handleScoreChange(index, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <PdfDownloadButton fileUrl={fileUrl} />
          </div>
        </>
      )}
    </div>
  );
};
export default GradeAssessment;
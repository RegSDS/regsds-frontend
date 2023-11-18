import React, { useState } from "react";
import PdfDownloadButton from "../components/PdfDownloadButton";
import { apiClient } from "../utils/clients";

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

  const [isPDF, setIsPDF] = useState(false);

  const [name, setName] = useState('');

  const [getGradeResult, setGetGradeResult] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };


  const handleScoreChange = (index, event) => {
    let { name, value } = event.target;
    if (name === "score" && value > 100) {
      value = 100;
    }
    const newData = [...studentScore];
    newData[index] = { ...newData[index], [name]: value };
    setStudentScore(newData);
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
    const request = {
      students: studentScore,
      criteria: [{
        isGroup: gradingType === "group",
        A_score: criteria[0].score,
        B_plus_score: criteria[1].score,
        B_score: criteria[2].score,
        C_plus_score: criteria[3].score,
        C_score: criteria[4].score,
        D_plus_score: criteria[5].score,
        D_score: criteria[6].score,
        F_score: criteria[7].score,
      }],
    };
    // console.log(name);
    // console.log(request);
    // console.log(`isPDF: ${isPDF}`);
    apiClient.postGradeAssessment(request).then((response) => {
      console.log(response);
      setGetGradeResult(response.data);
      setIsSubmitted(true);
    });
  };

  const fetchPDF = async () => {
    // --- This is the code to download the PDF file from the server ---
    console.log(getGradeResult);
    const response = await apiClient.genPDFGradeAssessment(getGradeResult);
    console.log(response);

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "gradeCalcultor.pdf";
    link.click();

    // console.log("PDFRESULT",pdfResult);
    // const pdfBlob = new Blob([pdfResult], { type: 'application/' });    // const blob = new Blob(Buffer.from(pdfResult), {type: "application/pdf"});
    // console.log(pdfBlob)
    // const blobUrl = URL.createObjectURL(pdfBlob);

    // // Create a link element
    // const link = document.createElement('a');
    // link.href = blobUrl;
    // link.download = 'example.pdf';

    // // Append the link to the document and trigger a click event
    // document.body.appendChild(link);
    // link.click();

    // // Clean up by removing the link element and revoking the Blob URL
    // document.body.removeChild(link);
    // URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="container">
      <h1>Grade Assessment</h1>
      <label>
        Enter professor name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <table style={{marginTop: "20px"}}>
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
      <div style={{ marginTop: "20px" }}>
        <label>
          <input
            type="radio"
            value="noPDF"
            checked={!isPDF}
            onChange={() => setIsPDF(false)}
          />
          No PDF
        </label>
        <label>
          <input
            type="radio"
            value="withPDF"
            checked={isPDF}
            onChange={() => setIsPDF(true)}
          />
          With PDF
        </label>
      </div>
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
              {getGradeResult.students.map((score, index) => (
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
                      type="text"
                      name="grade"
                      value={score.grade}
                      onChange={(e) => handleScoreChange(index, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isPDF && (
            <div style={{ marginTop: "20px" }}>
              <button onClick={fetchPDF}>PDF</button>
              {/* <PdfDownloadButton fileUrl={fileUrl} /> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default GradeAssessment;

import React, { useState } from "react";
import { apiClient } from "../utils/clients";

const grades = ["-", "A", "B+", "B", "C+", "C", "D+", "D", "F"];

const GradeCalculator = () => {
  const [gradeData, setGradeData] = useState([
    { courseName: "", credit: "0.5", grade: "" },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gradeResult, setGradeResult] = useState(0);
  const [isPDF, setIsPDF] = useState(false);
  const [name, setName] = useState("");
  const [getGradeResult, setGetGradeResult] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...gradeData];
    newData[index] = { ...newData[index], [name]: value };
    setGradeData(newData);
  };

  const addSubjectRow = () => {
    setGradeData([...gradeData, { courseName: "", credit: "0.5", grade: "" }]);
  };

  const onSubmit = () => {
    // Add your own logic to submit the form
    setIsSubmitted(true);
    const newGrade = gradeData.map((grade) => ({
      ...grade,
      credit: parseFloat(grade.credit),
    }));
    const result = {
      name: name,
      grades: newGrade,
      isPDF: isPDF,
    };
    // console.log(name);
    console.log(result);
    // console.log(`isPDF: ${isPDF}`);
    apiClient.postGradeCalculator(result).then((response) => {
      console.log(response.data);
      setGetGradeResult(response.data);
      setGradeResult(response.data.GPA);
      // setPdfResult(response.data.pdfFile.data);
    });
  };

  const fetchPDF = async () => {
    // --- This is the code to download the PDF file from the server ---
    console.log(getGradeResult);
    const response = await apiClient.genPDFGradeCalculator(getGradeResult);
    console.log(response);

    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "gradeCalcultor.pdf";
    link.click();
  };
  return (
    <div className="container">
      <h1>Grade Calculator</h1>
      <label>
        Enter student name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <table style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Subject</th>
            <th>Credit</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {gradeData.map((subject, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  name="courseName"
                  value={subject.courseName}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="credit"
                  value={subject.credit}
                  min="0.5"
                  step="0.5"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <select
                  name="grade"
                  value={subject.grade}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button style={{ marginTop: "10px" }} onClick={addSubjectRow}>
        Add Row
      </button>
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
      <button style={{ marginTop: "10px" }} onClick={onSubmit}>
        Submit
      </button>
      {isSubmitted && (
        <>
          <div style={{ marginTop: "20px" }}>
            <strong>GPA: {gradeResult}</strong>
          </div>
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
export default GradeCalculator;

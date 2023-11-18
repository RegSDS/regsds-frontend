import React, { useState } from "react";
import PdfDownloadButton from "../components/PdfDownloadButton";

const grades = ["-", "A", "B+", "B", "C+", "C", "D+", "D", "F"];

const GradeCalculator = () => {
  const [gradeData, setGradeData] = useState([
    { subject: "", credit: "0.5", grade: "" },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gradeResult, setGradeResult] = useState(0);
  const [isPDF, setIsPDF] = useState(false);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...gradeData];
    newData[index] = { ...newData[index], [name]: value };
    setGradeData(newData);
    console.log(newData);
  };

  const addSubjectRow = () => {
    setGradeData([...gradeData, { subject: "", credit: "0.5", grade: "" }]);
  };

  // const calculateGPA = () => {
  //   const totalCredits = gradeData.reduce(
  //     (acc, subject) => acc + parseFloat(subject.credit),
  //     0
  //   );
  //   const weightedSum = gradeData.reduce(
  //     (acc, subject) =>
  //       acc + convertGradeToValue(subject.grade) * parseFloat(subject.credit),
  //     0
  //   );
  //   const gpa = weightedSum / totalCredits;
  //   return gpa.toFixed(2);
  // };

  const convertGradeToValue = (grade) => {
    // Add your own logic to convert the grade to a numerical value
    switch (grade) {
      case "A":
        return 4.0;
      case "B+":
        return 3.5;
      case "B":
        return 3.0;
      case "C+":
        return 2.5;
      case "C":
        return 2.0;
      case "D+":
        return 1.5;
      case "D":
        return 1.0;
      case "F":
        return 0.0;
      default:
        return 0.0; // default to 0.0 for unknown grades
    }
  };

  const onSubmit = () => {
    // Add your own logic to submit the form
    setIsSubmitted(true);
    const transformedArray = gradeData.map(item => [convertGradeToValue(item.grade), parseFloat(item.credit)]);
    console.log(transformedArray);
  };

  const fileUrl =
    "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2023_1/35359/materials/SDS_2023_Project-172259-16974308330695.pdf";
  return (
    <div className="container">
      <h1>Grade Calculator</h1>
      <table>
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
                  name="subject"
                  value={subject.subject}
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
            value="withPDF"
            checked={isPDF}
            onChange={() => setIsPDF(true)}
          />
          With PDF
        </label>
        <label>
          <input
            type="radio"
            value="noPDF"
            checked={!isPDF}
            onChange={() => setIsPDF(false)}
          />
          No PDF
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
          <div style={{ marginTop: "20px" }}>
            <PdfDownloadButton fileUrl={fileUrl} />
          </div>
        </>
      )}
    </div>
  );
};
export default GradeCalculator;

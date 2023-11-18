import React, { useState } from "react";
import PdfDownloadButton from "../components/PdfDownloadButton";
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
  const [pdfResult, setPdfResult] = useState();
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

  const fileUrl =
    "https://mycourseville-default.s3.ap-southeast-1.amazonaws.com/useruploaded_course_files/2023_1/35359/materials/SDS_2023_Project-172259-16974308330695.pdf";

  const fetchPDF = async () => {
    const ex = {
      name: "Nitiwat Jongruktrakoon",
      credits: 9,
      GPA: "3.90",
      grades: [
        {
          courseName: "Software Defined System",
          grade: "A",
          credit: 3,
        },
        {
          courseName: "Software Architecture",
          grade: "B+",
          credit: 3,
        },
        {
          courseName: "Computer Security",
          grade: "A",
          credit: 3,
        },
      ],
    };
    // --- This is the code to download the PDF file from the server ---
    console.log(getGradeResult);
    const response = await apiClient.genPDFGradeCalculator(getGradeResult);
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

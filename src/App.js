import React, { useState } from "react";
import "./App.css";
import GradeCalculator from "./pages/GradeCalculator";
import GradeAssessment from "./pages/GradeAssessment";
import CourseList from "./pages/CourseList";

function App() {
  return (
    <div style={{padding:"40px 80px"}}>
      <GradeCalculator/>
      <hr/>
      <GradeAssessment/>
      <hr/>
      <CourseList/>
    </div>
  )
}

export default App;

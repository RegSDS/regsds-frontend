import React from 'react';
import './CourseList.css'; // Import your CSS file

const CourseList = () => {
  const courses = [
    {
      name: "2110101 Computer Programming",
      credit: 3,
      startTime: "9:00",
      endTime: "12:00",
      days: ["WED"],
    },
    {
      name: "2110327 Algorithm Design",
      credit: 3,
      startTime: "8:00",
      endTime: "9:30",
      days: ["TUE", "THU"],
    },
    {
      name: "2110415 Software Defined Systems",
      credit: 3,
      startTime: "9:00",
      endTime: "12:00",
      days: ["MON"],
    },
  ];

  return (
    <div className="container">
      <h1>Course List</h1>
      <table className="course-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Credit</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{course.name}</td>
              <td>{course.credit}</td>
              <td>{course.startTime}</td>
              <td>{course.endTime}</td>
              <td>{course.days.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;

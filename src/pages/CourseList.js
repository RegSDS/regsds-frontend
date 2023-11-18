import React, { useEffect } from 'react';
import './CourseList.css'; // Import your CSS file
import { apiClient } from '../utils/clients';

const CourseList = () => {
  const [courses, setCourses] = React.useState([]);

  useEffect(() => {
    // Add your code here
    apiClient.getCourseList().then((response) => {

      console.log(response.data);
      setCourses(response.data.data);
    });
  }
  , []);

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

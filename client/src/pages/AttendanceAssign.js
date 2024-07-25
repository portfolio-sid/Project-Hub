import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const AttendanceAssign = () => {
  const {authState}= useContext(AuthContext);
  const userID= authState.id;
  let navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/manage/mentee/${userID}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      setStudentList(response.data);
      console.log(response.data);
    });
  }, []);
  
  const handlePresent = (studentId) => {
    axios.post(`http://localhost:3001/manage/present/${studentId}`, {}, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setStudentList(studentList.filter((student) => student.id !== studentId));
    }).catch(error => {
      console.log(error);
    });
  }
  const handleAbsent = (studentId) => {
    axios.post(`http://localhost:3001/manage/absent/${studentId}`, {}, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setStudentList(studentList.filter((student) => student.id !== studentId));
    })
  }


  return (
    <div className='markAttendance-parent'>
    {studentList.length > 0 ? (
      studentList.map((student) => (
        <div key={student.id} className='markAttendance'>
          <div>{student.registrationNumber}</div>
          <button onClick={() => handlePresent(student.id)} className='present'>Present</button>
          <button onClick={() => handleAbsent(student.id)} className='absent'>Absent</button>
        </div>
      ))
    ) : (
      <div>Attendance marked successfully.</div>
    )}
  </div>
  );
};
export default AttendanceAssign;

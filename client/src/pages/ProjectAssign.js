import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const ProjectAssign = () => {
  const {authState}= useContext(AuthContext);
  const userID= authState.id;
  let navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/assign/approvalList/${userID}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      setStudentList(response.data);
      console.log(response.data);
    });
  }, []);
  
  const handleAllow = (studentId) => {
    axios.post(`http://localhost:3001/assign/allow/${studentId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setStudentList(studentList.filter((student) => student.id !== studentId));
    });
  }
  const handleDeny = (studentId) => {
    axios.post(`http://localhost:3001/assign/deny/${studentId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      setStudentList(studentList.filter((student) => student.id !== studentId));
    })
  }


  return (
    <div className='assign-parent'>
    {studentList.length > 0 ? (
      studentList.map((student) => (
        <div key={student.id} className='assign'>
          <div>{student.registrationNumber}</div>
          <button onClick={() => handleAllow(student.id)} className='approve'>Allow</button>
          <button onClick={() => handleDeny(student.id)} className='deny'>Deny</button>
        </div>
      ))
    ) : (
      <div>No new requests.</div>
    )}
  </div>
  );
};
export default ProjectAssign;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const MarksAssign = () => {
  const {authState}= useContext(AuthContext);
  const userID= authState.id;
  let navigate = useNavigate();
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [marks, setMarks]= useState({mte1: 0, mte2: 0, ete: 0, cws: 0});
  useEffect(() => {
    axios.get(`http://localhost:3001/manage/mentee/${userID}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      setStudentList(response.data);
    });
  }, []);
  
  const updateMarks = (event) => {
    const data = {mte1: marks.mte1, mte2: marks.mte2, ete: marks.ete, cws: marks.cws};
    axios.post(`http://localhost:3001/manage/marks/${selectedStudent}`, data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {

    });
  }
  const handleSelectStudent = (e) => {
    console.log(e.target.value);
    setSelectedStudent(e.target.value);
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMarks((prevValues) => {
      return {
        ...prevValues,
        [name]: value
      };
    });
  }
  return (
    
    <>
        
        <form onSubmit={updateMarks} className='mark-container'>
          
        <select id="student" name="student" onChange={handleSelectStudent} className='mark-field'>
          <option value="">--Select--</option>
          {studentList.map((student) => (
            <option key={student.id} value={student.id}>
              {student.registrationNumber}
            </option>
          ))}
        </select>
        <div className='mark-field'>
          <label htmlFor="mte1">MTE1 Marks:</label>
          <input type="number" id="mte1" name="mte1" value={marks.mte1} onChange={handleChange} />
        </div>
        
        <div className='mark-field'>
          <label htmlFor="mte2">MTE2 Marks:</label>
          <input type="number" id="mte2" name="mte2" value={marks.mte2} onChange={handleChange} />
        </div>
        <div className='mark-field'>
          <label htmlFor="cws">CWS Marks:</label>
          <input type="number" id="cws" name="cws" value={marks.cws} onChange={handleChange} />
        </div>
        <div className='mark-field'>
          <label htmlFor="ete">ETE Marks:</label>
          <input type="number" id="ete" name="ete" value={marks.ete} onChange={handleChange} />
        </div>
        
        <button type="submit" className='mark-button'>Submit</button>
      </form>
      </>
  );
};
export default MarksAssign;

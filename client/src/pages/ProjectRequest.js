import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const ProjectRequest = () => {
  const {authState}= useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const userID= authState.id;
  let navigate = useNavigate();
  const [facultyList, setFacultyList] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3001/assign`).then((response) => {
          setFacultyList(response.data);
          console.log(response.data);
        });
  }, []);

  const handleSelectFaculty = (e) => {
    console.log(e.target.value);
    setSelectedFaculty(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    //Save the selected faculty mentor for the current student in the student table using an API call to the backend
    console.log(userID);
    
    const data = {guide: selectedFaculty, id: userID, status: "Requested"}
    axios.post("http://localhost:3001/assign/choose", data).then((response) => {
      setErrorMessage(response.data.message);
      
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='projectrequest'>
        <label htmlFor="faculty">Choose your faculty mentor:</label>
        <select id="faculty" name="faculty" onChange={handleSelectFaculty}>
          <option value="">--Select--</option>
          {facultyList.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.username}
            </option>
          ))}
        </select>
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProjectRequest;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

const Profile = () => {
  const {authState}= useContext(AuthContext);
  const userID= authState.id;
  const [details, setDetails] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/assign/profile/${userID}`, {}, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      if(response.data.error)
        alert(response.data.error);
      else{
          setDetails(response.data);
          console.log(response.data);
  }});
  }, []);

  
  
 

  return (
    <div>
      <div className="container">
  <div className="section">
    <h2>Details</h2>
    <table className="table">
      <tbody>
        <tr>
          <th>Registration number:</th>
          <td>{details.registrationNumber}</td>
        </tr>
        <tr>
          <th>Phone:</th>
          <td>{details.phone}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>{details.email}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="section">
    <h2>Attendance</h2>
    <table className="table">
      <tbody>
        <tr>
          <th>Present:</th>
          <td className="present">{details.present}</td>
        </tr>
        <tr>
          <th>Absent:</th>
          <td className="absent">{details.absent}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="section">
    <h2>Marks</h2>
    <table className="table">
      <tbody>
        <tr>
          <th>MTE1:</th>
          <td>{details.mte1Marks === -1 ? "NA" : details.mte1Marks}</td>
        </tr>
        <tr>
          <th>MTE2:</th>
          <td>{details.mte2Marks === -1 ? "NA" : details.mte2Marks}</td>
        </tr>
        <tr>
          <th>CWS:</th>
          <td>{details.cwsMarks === -1 ? "NA" : details.cwsMarks}</td>
        </tr>
        <tr>
          <th>ETE:</th>
          <td>{details.eteMarks === -1 ? "NA" : details.eteMarks}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  
  </div>
);};

export default Profile;

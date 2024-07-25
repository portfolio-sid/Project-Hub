import React, { useContext, useState } from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../helpers/AuthContext';
import {useNavigate} from 'react-router-dom';
const Enrol = () => {
  const {authState}= useContext(AuthContext);
  const userID= authState.id;
  let navigate = useNavigate();
  const initialValues ={
    regno: "",
    email: "",
    phone: "",
    year: ""
};
const [errorMessage, setErrorMessage] = useState("");
const validationSchema = Yup.object().shape({
  regno: Yup.string().min(9).max(9).required(),
  phone: Yup.string().min(10).max(10).required(),
  year: Yup.string().min(4).max(4).required(),
  email: Yup.string().email('Invalid email').required(),
});
  const onSubmit = (data) => {
    
    console.log(userID);
    axios.post(`http://localhost:3001/assign/enrol/${userID}`, data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(response => {
      setErrorMessage(response.data.message);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='enrol'>
                <label>Registration number: </label>
                <ErrorMessage name="regno" component="span" />
                <Field autoComplete="off" id="inputCreatePost" name="regno" placeholder="9-digit-number"/>
                <label>email: </label>
                <ErrorMessage name="email" component="span" />
                <Field autoComplete="off" type="" id="inputCreatePost" name="email" placeholder="abc@gmail.com"/>
                <label>Phone number: </label>
                <ErrorMessage name="phone" component="span" />
                <Field autoComplete="off" type="" id="inputCreatePost" name="phone" placeholder="10-digit-number"/>
                <label>Year: </label>
                <ErrorMessage name="year" component="span" />
                <Field autoComplete="off" type="" id="inputCreatePost" name="year" placeholder="20xx"/>
                {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
                <button type="submit">Enrol</button>
            </Form>
        </Formik>
        
    </div>
  );
};

export default Enrol;

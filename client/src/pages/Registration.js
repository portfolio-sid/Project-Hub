import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Registration() {
    const initialValues ={
        username: "",
        password: "",
        role: "",
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(8).max(20).required(),
    });
    let navigate = useNavigate()
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
            navigate("/login");
        });
    };
  return (
    <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='registration'>
                <label>Username: </label>
                <ErrorMessage name="username" component="span" />
                <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="(Ex. John123...)"/>
                <label>Password: </label>
                <ErrorMessage name="password" component="span" />
                <Field autoComplete="off" type="password" id="inputCreatePost" name="password" placeholder="Your Password"/>
                <label>Role:</label>
                <Field as="select" name="role">
                <option value="Admin">Admin</option>
                <option value="Faculty">Faculty</option>
                <option value="Student">Student</option>
                </Field>
                <button type="submit">Register</button>
            </Form>
        </Formik> 
    </div>
  )
}

export default Registration
import React, {useState, useContext} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {authState, setAuthState} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate()
    const login = () => {
        const data = {username: username, password: password};
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if(response.data.error)
                setErrorMessage(response.data.error);
            else{
                localStorage.setItem("accessToken", response.data.token);
                console.log(response);
                setAuthState({username: response.data.username, id: response.data.id, role: response.data.role, status: true});
                navigate("/");
            }
        });
        
    };

  return (
    <div className='loginContainer'>
        <label>Username:</label>
        <input type="text" onChange={(event) => {
            setUsername(event.target.value);
        }}/>
        <label>Password:</label>
        <input type="password" onChange={(event) => {
            setPassword(event.target.value);
        }}/>
        {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
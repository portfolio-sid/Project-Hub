import './Apptrial.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectRequest from './pages/ProjectRequest';
import ProjectAssign from './pages/ProjectAssign';
import AttendanceAssign from './pages/AttendanceAssign';
import MarksAssign from './pages/MarksAssign';
import Enrol from './pages/Enrol';
import Profile from './pages/Profile';
import { Navigate } from 'react-router-dom';
function App() {

  const [authState, setAuthState] = useState({username: "", id: 0, role:"None", status: false});
  useEffect(() => {
    axios.get('http://localhost:3001/auth/checkauth', {headers: {
      accessToken: localStorage.getItem('accessToken'),
    },
  }).then((response) => {
      if(response.data.error) 
        setAuthState({...authState, status: false});
      else
        setAuthState({username: response.data.username, id: response.data.id, role: response.data.role, status: true});
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({username: "", id: 0, role:"None", status: false});
    return <Navigate to="/" replace />;
  };

  return(
    <div className='App'>
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
        <div className='topnav'>
        <Link to="/">Home</Link>
        {!authState.status ? (
        <>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
        </>) : (
          <>
           
        {authState.role === "Student" && (
          <>
        <Link to="/enrol">Enrol</Link>
        <Link to="/request">Apply</Link>
        <Link to="/profile">Profile</Link>
          </>
        )}
        {authState.role === "Faculty" && (
        <>
        <Link to="/assign">Requests</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/marks">Marks</Link>
        
        </>
        )}
        </>
        )}
        
        <div className='loggedInContainer'>
        <h1>{authState.username}</h1>
        {authState.status &&
        <Link to="/"><button onClick={logout} className='logout'>Logout</button></Link>}
        </div>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/request" element={<ProjectRequest/>} />
          <Route path="/assign" element={<ProjectAssign/>} />
          <Route path="/attendance" element={<AttendanceAssign/>} /> 
          <Route path='/marks' element={<MarksAssign/>} />
          <Route path="/enrol" element={<Enrol/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

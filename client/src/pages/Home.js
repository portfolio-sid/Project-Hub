import React from 'react'
import axios from "axios";
import './Home.css'
import {useEffect, useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    const {authContext}= useContext(AuthContext);
    let navigate = useNavigate();

  useEffect(() =>{
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  
  return (
    
    <div className='homeback'>
    
    {listOfPosts.map((value, key) => {
        return (
            <div key={key} className='post' onClick={() => {navigate(`/post/${value.id}`)}}>
                <div className='title'>{value.title}</div>
                <div className='body'>{value.postText}</div>
                <div className='footer'>{value.username}</div>
            </div>
        );
    })}
    </div>
  );
}

export default Home
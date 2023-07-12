import React, { useState } from 'react'
import './login.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { login } from '../../context/authContext/authAPI_Call';
// import { useLocation } from 'react-router-dom';

export default function Login() {
  const [email,setEmail]= useState("")
  const [password,setPassword]= useState("");
  const {isFetching,dispatch} = useContext(AuthContext);
  const handleLogin = (e)=>{
    login({email,password},dispatch)
  }
  return (
    <div className='login'>
        <form className="loginForm">
            <input type="email" name="email" placeholder='email' className='loginInput' id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input type="password" autoComplete='on' name="password" placeholder='password' value={password} className='loginInput' id="password" onChange={(e)=>{setPassword(e.target.value)}} />
            <button className='loginBtn' disabled={isFetching}  onClick={handleLogin}>Login</button>
        </form>
    </div>
  )
}

import React, { useContext ,useState } from 'react';
import './SignInDialog.css';
import logo from '../assets/logo-black.png';
import {Spinner} from 'react-bootstrap';
import {useLoginUserMutation} from "../services/appApi";
import { Link , useNavigate } from "react-router-dom";
import {AppContext} from "../context/appContext";


const SignInDialog = ({ open, onClose, onSignUpClick }) => {

const [name,setName]=useState("");
const [password,setPassword]=useState("");
const [loginUser , {isLoading,error}]=useLoginUserMutation();
const {socket}=useContext(AppContext);
const navigate = useNavigate();
  const dialogStyle = {
    display: open ? 'block' : 'none',
  };

  const handleNameChange = (e)=>{
    setName(e.target.value);
  }

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value);
  }

  const submitButton = async(e)=>{
    e.preventDefault();
    loginUser({ name, password }).then(({ data }) => {
      if (data) {
        socket.emit("new-user")
        console.log(data);
        navigate("/post");
      }
    });
    setName("");
    setPassword("");
  };

  return (
    <div className="dialog-overlay" style={dialogStyle}>
      <div className="dialog">
        <button className="dialog-close" onClick={onClose}>
          &times;
        </button>
        <img src={logo} alt="Logo" className="dialog-logo" />
        <h2 className="dialog-title">Sign in to X</h2>
        <div className="input-group">
          <input className="input-field" type="text" placeholder="Username" onChange={handleNameChange} value={name}/>
        </div>
        <div className="input-group">
        <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => handlePasswordChange(e)}
            value={password}
          />
        </div>
        <button className="dialog-button primaryLog" onClick={submitButton}>
        {isLoading ? <Spinner animation="grow"></Spinner>:"Next"}</button>
        <p className="signup-text">
          Don't have an account?{' '}
          <span className="signup-link" onClick={onSignUpClick}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInDialog;

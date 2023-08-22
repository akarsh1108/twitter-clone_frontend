import React, { useState } from "react";
import "./SignUpDialog.css";
import {Spinner} from 'react-bootstrap';
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
const SignUpDialog = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();
  const dialogStyle = {
    display: open ? "block" : "none",
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const submitButton = async (e) => {
    e.preventDefault();
    if (name.length < 3) return alert("Please Enter a valid username");
    if (password.length < 5) return alert("Please Enter a strong password");
    signupUser({ name, password }).then(({ data }) => {
      if (data) {
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
        <h2 className="dialog-title">Create Account</h2>
        <div className="input-group">
          <input
            type="text"
            id="name"
            placeholder="Name"
            onChange={(e) => handleNameChange(e)}
            value={name}
          />
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
      </div>
    </div>
  );
};

export default SignUpDialog;

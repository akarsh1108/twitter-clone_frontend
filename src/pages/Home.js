import React, { useState } from 'react';
import './Home.css';
import logo from '../assets/logo-black.png';
import SignInDialog from './SignInDialog';
import SignUpDialog from './SignUpDialog';

const Home = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const handleSignInOpen = () => {
    setSignInOpen(true);
  };

  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignInOpen(false);
    setSignUpOpen(true); 
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  return (
    <div className="container">
      <div className="left">
        <img src={logo} alt="Logo" />
      </div>
      <div className="right">
        <div>
          <h1 className="title">Happening now</h1>
          <h2 className="subtitle">Join today.</h2>
          <button className="primary" onClick={handleSignInOpen}>
            Sign in
          </button>
          <p className="paratext">
            By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
          </p>
          <h5 className="h5">Don't have an account?</h5>
          <button className="secondary" onClick={handleSignUpOpen}>
            Sign up
          </button>
        </div>
      </div>
      <SignInDialog open={signInOpen} onClose={handleSignInClose} onSignUpClick={handleSignUpOpen} />
      <SignUpDialog open={signUpOpen} onClose={handleSignUpClose} />
    </div>
  );
};

export default Home;

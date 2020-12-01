import React from "react";
import Background from './Background';
import InfoBox from './InfoBox';
import '../styles/global.css';
import '../styles/LogIn.css';

function LogIn() {
  return (
  <>
    <Background />
    <div className="login">
      <h3 className="login-header">Log in</h3>
      <button className="login-google-button">Continue with Google</button>
      <canvas className="login-separator"/>
      <InfoBox subject="Email"/>
      <InfoBox subject="Password"/>
      <button className="login-submission-button">Log in with email</button>
      <h3 className="login-forgot-password">Forgot your password?</h3> 
      <button className="login-new-account">Don't have an account yet?</button>
    </div>
  </>
  );
}

export default LogIn;
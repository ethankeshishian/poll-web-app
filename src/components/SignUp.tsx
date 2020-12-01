import React from "react";
import Background from './Background';
import InfoBox from './InfoBox';
import '../styles/global.css';
import '../styles/SignUp.css';

function SignUp() {
  return (
  <>
    <Background />
    <div className="signup">
      <h3 className="signup-header">Sign up</h3>
      <InfoBox subject="Email"/>
      <InfoBox subject="Create Password"/>
      <button className="signup-submission-button">Create account</button>
      <canvas className="signup-separator"/>
      <button className="signup-google-button">Sign up with Google</button>
      <button className="signup-goto-login">Already have an account?</button>
    </div>
  </>
  );
}

export default SignUp;
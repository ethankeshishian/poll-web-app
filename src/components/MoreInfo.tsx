import React from "react";
import Background from './Background';
import InfoBox from './InfoBox';
import '../styles/global.css';
import '../styles/MoreInfo.css';

function MoreInfo() {
  return (
  <>
    <Background />
    <div className="popup-window">
      <h3 className="header">Additional Info</h3>
      <InfoBox subject="Age"/>
      <InfoBox subject="Gender"/>
      <InfoBox subject="Country of Residence"/>
      <InfoBox subject="City"/>
      <button className="submission-button">Complete account</button>
    </div>
  </>
  );
}

export default MoreInfo;
import React, { Component } from "react";
import '../styles/InfoBox.css';

function InfoBox(props: { subject: string }) {
  return (<div className="info-box">{props.subject}</div>);
}

export default InfoBox;
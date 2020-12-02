import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../styles/InfoBox.css';

function InfoBox(props: { subject: string }) {
  return (
    <form>
      <label>
        <input className = "info-box" type="text" placeholder={props.subject}/>
      </label>
    </form>
  );
}

export default InfoBox;
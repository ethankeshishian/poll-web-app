import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../styles/InfoBox.css';

function InfoBox(props: { subject: string, onChange?: any }) {
  return (
    <form>
      <label>
        <input className = "info-box" onChange={props.onChange} type="text" placeholder={props.subject}/>
      </label>
    </form>
  );
}

export default InfoBox;
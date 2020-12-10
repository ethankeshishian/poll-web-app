import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../styles/InvisibleTextBox.css';

function InvisibleTextBox(props: { subject: string, onChange?: any }) {
  return (
    <form>
      <label>
        <input className = "text-box" onChange={props.onChange} type="text" placeholder={props.subject}/>
      </label>
    </form>
  );
}

export default InvisibleTextBox;
import React, { useState } from "react";
import '../styles/InfoBox.css';

function InfoBox(props: { subject: string, onChange?: any, gender?: boolean, value?: string }) {
  return (
    <form>
      <label>
        {!props.gender &&
        <input className = "info-box" onChange={props.onChange} type="text" placeholder={props.subject}/>
        }
        {props.gender && 
        <select className = "info-box" value={props.value} onChange={props.onChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        }
      </label>
    </form>
  );
}

export default InfoBox;
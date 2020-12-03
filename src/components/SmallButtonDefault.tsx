import React from 'react';
import '../styles/SmallButtonDefault.css';

function SmallButtonDefault(props: { text: string, onClick?: React.MouseEventHandler }) {
  return <button onClick={props.onClick} className="small-btn-default">{props.text}</button>;
}

export default SmallButtonDefault;

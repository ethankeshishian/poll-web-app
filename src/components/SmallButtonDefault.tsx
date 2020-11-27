import React from 'react';
import '../styles/SmallButtonDefault.css';

function SmallButtonDefault(props: { text: string }) {
  return <button className="small-btn-default">{props.text}</button>;
}

export default SmallButtonDefault;

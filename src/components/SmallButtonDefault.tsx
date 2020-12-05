import React from 'react';
import '../styles/SmallButtonDefault.css';

function SmallButtonDefault(props: { children: any, onClick?: React.MouseEventHandler }) {
  return <button onClick={props.onClick} className="small-btn-default">{props.children}</button>;
}

export default SmallButtonDefault;

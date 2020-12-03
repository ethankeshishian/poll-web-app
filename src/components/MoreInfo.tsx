import React, { useState } from "react";
import Background from './Background';
import InfoBox from './InfoBox';
import '../styles/global.css';
import '../styles/MoreInfo.css';

import { connect } from 'react-redux';
import { Actions } from '../reducer';

function MoreInfo(props : any) {
  
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  return (
  <>
    <Background />
    <div className="popup-window">
      <button className="close-window">X</button>
      <h3 className="header">Additional Info</h3>
      <InfoBox onChange={(event : any) => setName(event.target.value)} subject="Name"/>
      <InfoBox onChange={(event : any) => setAge(event.target.value)} subject="Age"/>
      <InfoBox onChange={(event : any) => setGender(event.target.value)} subject="Gender"/>
      <InfoBox onChange={(event : any) => setLocation(event.target.value)} subject="City"/>
      <button 
      onClick={() => {
        if (age != 0 && name && gender && location) {
          props.attributes({
            name: name,
            age: age,
            gender: gender,
            location: location,
          }, props.session);
        }
      }}
      className="submission-button">Complete account</button>
    </div>
  </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    session: state.Account.get('key')
  };
};

const mapDispatchToProps = (dispatch : any) => {
  return {
    attributes: (attributes : any, user : any) => {
      Actions.account.attributes(dispatch, attributes, user);
    },
    userInfo: () => {
      Actions.account.userInfo(dispatch);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfo);
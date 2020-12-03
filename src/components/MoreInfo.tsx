import React, { useState } from "react";
import Background from './Background';
import InfoBox from './InfoBox';
import '../styles/global.css';
import '../styles/MoreInfo.css';

import { connect } from 'react-redux';
import { Actions } from '../reducer';

function MoreInfo(props : any) {

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");

  return (
  <>
    <Background />
    <div className="popup-window">
      <button className="close-window">X</button>
      <h3 className="header">Additional Info</h3>
      <InfoBox onChange={(event : any) => setAge(event.target.value)} subject="Age"/>
      <InfoBox onChange={(event : any) => setGender(event.target.value)} subject="Gender"/>
      <InfoBox onChange={(event : any) => setCountry(event.target.value)} subject="Country of Residence"/>
      <InfoBox onChange={(event : any) => setLocation(event.target.value)} subject="City"/>
      <button 
      onClick={() => {
        if (age != 0 && gender && country && location) {
          props.attributes({
            age: age,
            gender: gender,
            country: country,
            location: location,
          }, props.key);
        }
      }}
      className="submission-button">Complete account</button>
    </div>
  </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    key: state.Account.get('key')
  };
};

const mapDispatchToProps = () => {
  return {
    attributes: (attributes : any, user : any) => {
      Actions.account.attributes(attributes, user);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfo);
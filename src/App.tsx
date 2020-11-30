import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import MoreInfo from './components/MoreInfo';

import { connect } from 'react-redux';
import { Actions } from './reducer';

function App(props : any) {
  useEffect(() => {
    props.latest();
    // props.userInfo();
    // if (!props.user) {
    //     props.oauth();
    // }
  }, [])

  return (
    <div className="App">
      <Header />
      <div className="page-container">
        <HomePage poll={props.poll}/>
        {/* <MoreInfo />
         <br />
        <ProfilePage />
        <AboutPage />
        <br /> */}
      </div>
    </div>
  );
}

const mapStateToProps = (state : any) => {
  return {
    poll: state.Polls.get('poll'),
    user: state.Login.get('user')
  }
}

const mapDispatchToProps = (dispatch : any) => {
  return {
    latest: () => {
      Actions.poll.latest(dispatch);
    },
    oauth: () => {
      Actions.login.OAuth();
    },
    userInfo: () => {
      Actions.login.userInfo(dispatch);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

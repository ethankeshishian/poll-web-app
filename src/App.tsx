import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import MoreInfo from './components/MoreInfo';

import { connect } from 'react-redux';
import { Actions } from './reducer';

function App(props: any) {
  useEffect(() => {
    props.latest();
    props.userInfo();
  }, []);

  // useEffect(() => {
  //   if (props.error) {
  //       props.oauth();
  //   }
  // }, [props.error])

  return (
    <div className="App">
      <Header />
      <div className="page-container">
        <HomePage poll={props.poll} respond={props.respond} />
        {/* <MoreInfo />
        <br /> */}
        <ProfilePage poll={props.poll} respond={props.respond} />
        {/* <AboutPage /> */}
        <br />
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    poll: state.Polls.get('poll'),
    user: state.Login.get('user'),
    error: state.Login.get('error')
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    latest: () => {
      Actions.poll.latest(dispatch);
    },
    respond: (responseId: Number) => {
      Actions.poll.respond(dispatch, responseId);
    },
    oauth: () => {
      Actions.login.OAuth();
    },
    userInfo: () => {
      Actions.login.userInfo(dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

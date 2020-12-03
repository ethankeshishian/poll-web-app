import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import MoreInfo from './components/MoreInfo';

import { connect } from 'react-redux';
import { Actions } from './reducer';

function App(props: any) {

  // Check if the attributes for a user are submitted (show popup if not)
  const [attributesSubmitted, attributes] = useState(true);

  useEffect(() => {
    props.latest();
    props.userInfo();
  }, []);

  useEffect(() => {
    if (props.user) {
      if (props.user.length == 4) {
        attributes(false);
      }
    }
  }, [props.user])

  return (
    <div className="App">
      <Header />
      <div className="page-container">
        <div>
          <HomePage />
        </div>
        {/* {!attributesSubmitted &&
        <div>
          <MoreInfo />
          <br />
        </div>
        } */}
         {/* <ProfilePage />  */}
        {/* <AboutPage /> */}
        <br />
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.Account.get('user'),
    error: state.Account.get('error')
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    latest: () => {
      Actions.poll.latest(dispatch);
    },
    userInfo: () => {
      Actions.account.userInfo(dispatch);
    },
    oauth: () => {
      Actions.account.OAuth();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

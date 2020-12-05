import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import MoreInfo from './components/MoreInfo';

import { connect } from 'react-redux';
import { Actions } from './reducer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App(props: any) {

  // Check if the attributes for a user are submitted (show popup if not)
  const [attributesSubmitted, attributes] = useState(true);

  useEffect(() => {
    props.latest();
    props.allSuggestions();
    props.createSuggestion();
    props.userInfo();
  }, []);

  useEffect(() => {
    if (props.comment) {
      props.latest(); 
    }
  }, [props.comment])

  useEffect(() => {
    if (props.user) {
      if (props.user.length === 4) {
        attributes(false);
      } else {
        attributes(true);
      }
    }
  }, [props.user])

  return (
    <div className="App">
        <Router>
          <Header />
          <div className="page-container">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/profile" render={() => (
                props.user ? (
                  <ProfilePage />
                ) : props.oauth()
              )} />
              <Route exact path="/about" component={AboutPage} />
            </Switch>
          </div>
        </Router>

        {!attributesSubmitted &&
        <div>
          <MoreInfo />
          <br />
        </div>
        }
        
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.Account.get('user'),
    error: state.Account.get('error'),
    comment: state.Polls.get('comment')
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
    logout: () => {
      Actions.account.logout(dispatch);
    },
    allSuggestions: () => {
      dispatch(Actions.suggestion.allSuggestions());
    },
    createSuggestion: () => {
      Actions.suggestion.create(dispatch, {
        poll_question: "This is a poll",
        poll_responses: ["A", "B"]
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import MoreInfo from './components/MoreInfo';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="page-container">
        <HomePage />
        <MoreInfo />
        {/* <br />
        <ProfilePage />
        <AboutPage />
        <br /> */}
      </div>
    </div>
  );
}

export default App;

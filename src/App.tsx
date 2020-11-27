import React from 'react';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="page-container">
        <HomePage />
        {/* <br />
        <ProfilePage />
        <br />
        <AboutPage /> */}
      </div>
    </div>
  );
}

export default App;

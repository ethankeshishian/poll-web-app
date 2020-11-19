import React from 'react';
import './App.css';
import Header from './components/Header';
import PollContainer from './components/PollContainer';
import CommentSection from './components/CommentSection';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main-page">
        <PollContainer />
        <CommentSection />
      </div>
    </div>
  );
}

export default App;

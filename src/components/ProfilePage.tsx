import React from 'react';
import SmallButtonDefault from './SmallButtonDefault';
import '../styles/ProfilePage.css';
import '../styles/global.css';
import Poll from './Poll';
import CommentSection from './CommentSection';

function ProfilePage() {
  //replace with name from backend
  const profile: { firstname: string } = { firstname: 'Julia' };
  const getName = (name: string) => {
    return <span className="profile-user-name bold">{name}</span>;
  };

  const poll: { date: string } = { date: 'November 23, 2020' };

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <h1 className="bold">Welcome, {getName(profile.firstname)}!</h1>
        <SmallButtonDefault text="Log out" />
      </div>
      <div className="profile-subheading-container">
        <h2 className="profile-subheading heavy">Your Past Polls</h2>
      </div>
      <div className="profile-details-container">
        <div className="profile-graph-container">
          <p>
            calendar displaying currrent month with answered poll dates
            highlighted/colored in, user can click on specific dates to see that
            date’s poll, results, and comments
          </p>
        </div>
        <div className="profile-history-container">
          <h3 className="profile-date-heading">{poll.date}</h3>
          <Poll
            question="Are you a cat or a dog person?"
            options={["Cat", "Dog"]}
          />
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

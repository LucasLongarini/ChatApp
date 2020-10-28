import React from 'react';
import "./UserWindow.css"
import UserProfile from '../UserProfile/UserProfile'

class UserWindow extends React.Component {
  render() {
    return (
      <div className="container user-container">
        <h1>Online Users</h1>
        <div className="user-list">
          <UserProfile/>
          <UserProfile/>
          <UserProfile/>
          <UserProfile/>
          <UserProfile/>
          <UserProfile/>
        </div>
      </div>
    );
  }
}

export default UserWindow;
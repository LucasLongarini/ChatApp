import React from 'react';
import "./UserWindow.css"
import UserProfile from '../UserProfile/UserProfile'

class UserWindow extends React.Component {
  render() {
    const users = this.props.users.map((user) => {
      if (this.props.user != undefined && 
          this.props.user.username === user.username) {
        user.isUser = true;
      }
      return <UserProfile key={user.username} user={user}/>
    });

    return (
      <div className="container user-container">
        <h1>Online Users</h1>
        <div className="user-list">
          {users}
        </div>
      </div>
    );
  }
}

export default UserWindow;
import React from 'react';
import "./UserProfile.css"
import UserAvatar from "../../../../Components/UserAvatar/UserAvatar"

class UserProfile extends React.Component {
  render() {
    return (
      <div className="user-profile-container shadow1">
        <UserAvatar color={this.props.user.color}/>
        <h3>{`${this.props.user.username} ${this.props.user.isUser ? '(you)': ''}`}</h3>
      </div>
    );
  }
}

export default UserProfile;
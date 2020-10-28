import React from 'react';
import "./UserProfile.css"
import UserAvatar from "../../../../Components/UserAvatar/UserAvatar"

class UserProfile extends React.Component {
  render() {
    return (
      <div className="user-profile-container shadow1">
        <UserAvatar/>
        <h3>User1</h3>
      </div>
    );
  }
}

export default UserProfile;
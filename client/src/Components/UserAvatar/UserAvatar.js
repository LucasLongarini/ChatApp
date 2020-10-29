import React from 'react';
import "./UserAvatar.css"

class UserAvatar extends React.Component {
  render() {
    return (
      <div style={{background: "#5F5F5F"}} className="user-avatar shadow1">
          <i className="fas fa-user"></i>
      </div>
    );
  }
}

export default UserAvatar;
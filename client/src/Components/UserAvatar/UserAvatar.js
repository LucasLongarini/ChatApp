import React from 'react';
import "./UserAvatar.css"

class UserAvatar extends React.Component {
  render() {
    return (
      <div style={{background: `${this.props.color}`}} className="user-avatar shadow1">
          <i className="fas fa-user"></i>
      </div>
    );
  }
}

export default UserAvatar;
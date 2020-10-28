import React from 'react';
import "./ChatMessage.css"

import Avatar from "../../../../Components/UserAvatar/UserAvatar"

class ChatMessage extends React.Component {
  render() {
    let isUser = this.props.user ? "user" : "";
    return (
      <div className={`chat-message-container ${isUser}`}>
        <div className="avatar-container">
            <Avatar/>
        </div>
        <div className={`chat-bubble shadow1 ${isUser}`}>
            <h4 className="other">User1</h4>
            <p>Hello World! How is everyone doing today? My day is great tooo!!!</p>
            <h6>21:00</h6>
        </div>
      </div>
    );
  }
}

export default ChatMessage;
import React from 'react';
import "./ChatMessage.css"

import Avatar from "../../../../Components/UserAvatar/UserAvatar"

class ChatMessage extends React.Component {
  render() {
    let isUser = this.props.message.isUser ? "user" : "";
    let message = this.props.message;

    let date = new Date(message.time);
    return (
      <div className={`chat-message-container ${isUser}`}>
        <div className="avatar-container">
            <Avatar color={message.user.color}/>
        </div>
        <div className={`chat-bubble shadow1 ${isUser}`}>
            <h4 className="other">{message.user.username}</h4>
            <p>{message.message}</p>
            <h6>{date.toLocaleTimeString()}</h6>
        </div>
      </div>
    );
  }
}

export default ChatMessage;
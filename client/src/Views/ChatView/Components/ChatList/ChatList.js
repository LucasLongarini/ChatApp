import React from 'react';
import "./ChatList.css"

import ChatMessage from "../ChatMessage/ChatMessage"

class ChatList extends React.Component {
  render() {
    const messages = this.props.messages.map((message) => {
      return <ChatMessage key={message.user.username} message={message}/>
    });
    return (
      <div className="chat-list">
          {messages}
      </div>
    );
  }
}

export default ChatList;
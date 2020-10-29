import React from 'react';
import "./ChatList.css"

import ChatMessage from "../ChatMessage/ChatMessage"

class ChatList extends React.Component {
  render() {
    console.log(this.props.messages);
    const messages = this.props.messages.map((message) => {
      return <ChatMessage message={message}/>
    });
    return (
      <div className="chat-list">
          {messages}
      </div>
    );
  }
}

export default ChatList;
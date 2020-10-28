import React from 'react';
import "./ChatList.css"

import ChatMessage from "../ChatMessage/ChatMessage"

class ChatList extends React.Component {
  render() {
    return (
      <div className="chat-list">
          <ChatMessage user={true}/>
          <ChatMessage/>
          <ChatMessage/>
          <ChatMessage/>
          <ChatMessage/>
          <ChatMessage/>
          <ChatMessage/>
      </div>
    );
  }
}

export default ChatList;
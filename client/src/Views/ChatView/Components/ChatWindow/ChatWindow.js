import React from 'react';
import "./ChatWindow.css"
import ChatList from "../ChatList/ChatList"

class ChatWindow extends React.Component {
  render() {
    return (
      <div className="container chat-container">
        <p id="user-indication">You are <span>user1</span></p>
        <ChatList />
        <div className="inputs">
          <input id="input" className="neo-shadow-inner" placeholder="Type Something..."></input>
          <button id="send-button" className="neo-shadow-outer">Send</button>
        </div>
      </div>
    );
  }
}

export default ChatWindow;
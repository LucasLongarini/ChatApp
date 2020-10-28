import React from 'react';
import './ChatView.css'
import ChatWindow from './Components/ChatWindow/ChatWindow';
import UserWindow from './Components/UserWindow/UserWindow';

class ChatView extends React.Component {
  render() {
    return (
      <div className="chat-view">
        <ChatWindow/>
        <UserWindow/>
      </div>
    );
  }
}

export default ChatView;

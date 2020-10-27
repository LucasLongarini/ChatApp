import React from 'react';
import './ChatView.css'
import ChatWindow from './Components/ChatWindow/ChatWindow';

class ChatView extends React.Component {
  render() {
    return (
      <div className="chat-view">
        <ChatWindow/>
      </div>
    );
  }
}

export default ChatView;

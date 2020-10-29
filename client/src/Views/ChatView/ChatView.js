import React from 'react';
import './ChatView.css'
import ChatWindow from './Components/ChatWindow/ChatWindow';
import UserWindow from './Components/UserWindow/UserWindow';
import io from 'socket.io-client';

class ChatView extends React.Component {

  socket;
  constructor(props) {
    super(props);
    this.socket = io();
    this.handleMessageSent = this.handleMessageSent.bind(this);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.socket.on('login', id => {
      console.log(id);
    });
  }

  componentWillUnmount() {

  }

  handleMessageSent(message) {
    this.state.messages.unshift({
      message: message, 
      username: "User1",
      time: "21:00",
      isUser: true
    });
    this.setState({messages: this.state.messages});
  }
  
  render() {
    return (
      <div className="chat-view">
        <ChatWindow messages={this.state.messages} handleMessageSent={this.handleMessageSent}/>
        <UserWindow/>
      </div>
    );
  }
}

export default ChatView;

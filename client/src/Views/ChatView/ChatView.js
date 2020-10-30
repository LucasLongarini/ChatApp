import React from 'react';
import './ChatView.css'
import ChatWindow from './Components/ChatWindow/ChatWindow';
import UserWindow from './Components/UserWindow/UserWindow';
import io from 'socket.io-client';

class ChatView extends React.Component {

  socket;
  constructor(props) {
    super(props);
    this.handleMessageSent = this.handleMessageSent.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleNewMessages = this.handleNewMessages.bind(this);
    this.handleNewUsers = this.handleNewUsers.bind(this);
    this.state = {
      user: undefined,
      messages: [],
      users: []
    };
  }

  componentDidMount() {
    // get cookies before (or web storage)
    this.socket = io('/', {
      query: {
        username: 'test'
      }
    });

    this.handleLogin();
    this.handleNewUsers();
    this.handleNewMessages();
  }

  handleLogin() {
    this.socket.on('login', data => {
      this.setState({user: data.user});

      data.messages.sort((a, b) => {
        let dateA = new Date(a.time);
        let dateB = new Date(b.time);
        if (dateA.getTime() > dateB.getTime())
          return -1;
        if (dateA.getTime() < dateB.getTime())
          return 1;
        return 0;
      });

      this.setState({messages: data.messages, users: data.users});
    });
  }

  handleNewMessages() {
    this.socket.on('new messages', messages => {
      messages.sort((a, b) => {
        let dateA = new Date(a.time);
        let dateB = new Date(b.time);
        if (dateA.getTime() > dateB.getTime())
          return -1;
        if (dateA.getTime() < dateB.getTime())
          return 1;
        return 0;
      });
      messages.map((message) => {
        if (this.state.user != undefined && 
          message.user.username === this.state.user.username) {
            message.isUser = true;
          }
        return message;
      });
      this.setState({messages: messages});
    });
  }

  handleNewUsers() {
    this.socket.on('new users', users => {
      this.setState({users: users});
    });
  }

  handleMessageSent(message) {
    this.socket.emit('send message', {message: message, user:this.state.user});
  }
  
  render() {
    return (
      <div className="chat-view">
        <ChatWindow user={this.state.user} messages={this.state.messages} handleMessageSent={this.handleMessageSent}/>
        <UserWindow user={this.state.user} users={this.state.users}/>
      </div>
    );
  }
}

export default ChatView;

import React from 'react';
import './ChatView.css'
import ChatWindow from './Components/ChatWindow/ChatWindow';
import UserWindow from './Components/UserWindow/UserWindow';
import io from 'socket.io-client';
import cookie from 'js-cookie';

class ChatView extends React.Component {

  socket;
  constructor(props) {
    super(props);
    this.handleMessageSent = this.handleMessageSent.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleNewMessages = this.handleNewMessages.bind(this);
    this.handleNewUsers = this.handleNewUsers.bind(this);
    this.handleNewUsername = this.handleNewUsername.bind(this);

    this.state = {
      user: undefined,
      messages: [],
      users: []
    };
  }

  componentDidMount() {
    // get cookies before (or web storage)
    this.socket = io();
    this.handleLogin();
    this.handleNewUsers();
    this.handleNewMessages();
    this.handleNewUsername();
  }

  handleLogin() {
    this.socket.on('login', data => {

      if (data.newUsername) {
        cookie.set('username', data.user.username, {expires: 1000});
        console.log('setting new username cookie', data.user.username);
      }
      
      this.setState({user: data.user});
      data.messages.sort((a, b) => {
        let dateA = new Date(a.time).getTime();
        let dateB = new Date(b.time).getTime();
        return dateB - dateA;
      });
      data.messages.forEach(message => {
        if (this.state.user != undefined && 
          message.user.username === this.state.user.username) {
            message.isUser = true;
          }
      });
      this.setState({messages: data.messages, users: data.users});
    });
  }

  handleNewUsername() {
    this.socket.on('new username', username => {
      this.state.user.username = username;
      this.setState({user: this.state.user});
      //update cookies
    });
  }

  handleNewMessages() {
    this.socket.on('new messages', messages => {
      messages.sort((a, b) => {
        let dateA = new Date(a.time).getTime();
        let dateB = new Date(b.time).getTime();
        return dateB - dateA;
      });
      messages.forEach(message => {
        if (this.state.user != undefined && 
          message.user.username === this.state.user.username) {
            message.isUser = true;
          }
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

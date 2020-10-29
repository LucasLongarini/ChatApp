import React from 'react';
import "./ChatWindow.css"
import ChatList from "../ChatList/ChatList"

class ChatWindow extends React.Component {

  constructor(props) {
    super(props)
    this.sendMessage = this.sendMessage.bind(this);
    this.textChanged = this.textChanged.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = {value: ''};
  }

  sendMessage() {
    if (this.state.value != '') {
      this.props.handleMessageSent(this.state.value);
      this.setState({value: ''});
    }
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  textChanged(e) {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div className="container chat-container">
        <p id="user-indication">You are <span>user1</span></p>
        <ChatList messages={this.props.messages}/>
        <div className="inputs">
          <input id="input" className="neo-shadow-inner" placeholder="Type a message..." onKeyDown={this.onKeyDown} value={this.state.value} onChange={this.textChanged}></input>
          <button id="send-button" className="neo-shadow-outer" onClick={this.sendMessage}>Send</button>
        </div>
      </div>
    );
  }
}

export default ChatWindow;
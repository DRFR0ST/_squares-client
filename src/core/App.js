import React, { Component } from 'react';
import './App.css';
import Events from '../events/chat.js';

import Login from '../components/Login/index';
import SendBox from '../components/SendBox/index';

class App extends Component {
  constructor() {
    super();
    this.state = {
      connected: false,
      error: null,
      logged: false,
      user: {username: "Gringo", color: "#99CC66"},
      motd: {user: {username: "Server", color: "#99CC66"}, content: "Welcome to _squares chat!"},
      messages: []
    }

    this.events = new Events();
  }

  componentDidMount() {
    this.events.onOpen = () => {this.setState({connected: true}); this.addMessage(JSON.stringify(this.state.motd)); console.info("Successfuly connected to server.");}
    this.events.onError = (error) => this.setState({error: "An error occured while connecting to server!"});
    this.events.onMessage = (message) => this.addMessage(message.data);
  }

  // User login method
  login(user) {
    this.setState({user: {...user}, logged: true});
  }

  // Method sending messages to the server
  sendMessage(text) {
    if(text === "") {
      this.systemMessage("You can't send an empty message!");
      return;
    }

    if(this.events.connection.readyState === 1) {
      const message = JSON.stringify({user: this.state.user, content: text}).toString();
      this.events.connection.send(message);
    } else {
      setTimeout(() => {
        this.sendMessage(text);
      }, 1000);
    }
  }

  // Intern messages
  systemMessage(message) {
    const msg = JSON.stringify({user: {username: "Server", color: "#BD0000"}, content: message});
    this.addMessage(msg);
  }

  // Adding messages to the front-end
  addMessage(message) {
    if(message.toString() === "[object Object]") return;

    let msg = message.indexOf("\\") > -1 ? this.findAndReplace(message, "\\", "") : message;
    if(msg[0] == "\"") msg = msg.toString().substring(1, message.length-1);
    if(msg[msg.length-1] == "\"") msg = msg.toString().slice(0, -1);
  
    if(JSON.parse(msg) instanceof Object) {
      this.setState({messages: [...this.state.messages, JSON.parse(msg)]});
    } else {
      console.log("Could not add message!");
    }
  }

  // Preparing messages to be displayed
  displayMessages() {
    const env = this;
    const messages = this.state.messages;

    const content = messages.map(function(message) {
      return <p style={{color: '#000'}} className={`message ${message.user.username === env.state.user.username ? "you" : "guest"}`}><span style={{color: message.user.color}}>{message.user.username}</span>: {message.content}</p>;
    });
    
    return content;
  }
  
  // Function helping to replace multiple character occurence
  findAndReplace(string, target, replacement) {
    var i = 0, length = string.length;

    for (i; i < length; i++) {
      string = string.replace(target, replacement);
    }
    return string;
  }

  render() {
    return (
      <div className="App">
        {this.state.logged ? <div>
          {this.state.connected ? <p>Connected!</p> : this.state.error !== null ? <p>{this.state.error}</p> :<p>Connecting...</p>}
          {this.state.messages.length > 0 ? this.displayMessages() : ""}
          <SendBox events={this.events} sendMessage={this.sendMessage.bind(this)} />
        </div> 
        : 
        <div>
          <Login login={this.login.bind(this)} />
        </div>}
      </div>
    );
  }
}

export default App;

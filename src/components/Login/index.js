import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: "145.239.90.117",
            port: "1337",
            username: "",
            color: "#99CC66"
        }
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            if(this.state.input !== "") {
                this.login();
            }
        }
    }

    login() {
        this.props.login({username: this.state.username, color: this.state.color, host: `${this.state.domain}:${this.state.port}`});
        this.setState({username: ""});
    }

    render() {
        return  <div>
                    <h4>Domain</h4>
                    <input placeholder="Domain" value={this.state.domain} onKeyPress={this.handleKeyPress} onChange={(e) => this.setState({domain: e.target.value})} />
                    <h4>Port</h4>
                    <input placeholder="Port" value={this.state.port} onKeyPress={this.handleKeyPress} onChange={(e) => this.setState({port: e.target.value})} />
                    <h4>Username</h4>
                    <input placeholder="Username" value={this.state.username} onKeyPress={this.handleKeyPress} onChange={(e) => this.setState({username: e.target.value})} />
                    <h4>Color</h4>
                    <input type="color" value={this.state.color} onChange={(e) => this.setState({color: e.target.value})} />
                    <br/><br/>
                    <button disabled={this.state.username.trim() === "" || this.state.domain.trim() === "" || this.state.port.trim() === ""} onClick={() => (this.state.domain || this.state.port || this.state.username) ? this.login() : alert("Fill out all fields!")}>Connect</button>
                </div>;
    }
}

export default Login;
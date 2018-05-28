import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
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
        this.props.login({username: this.state.input, color: this.state.color});
        this.setState({input: ""});
    }

    render() {
        return  <div>
                    <h4>Username</h4>
                    <input placeholder="Username" value={this.state.input} onKeyPress={this.handleKeyPress} onChange={(e) => this.setState({input: e.target.value})} />
                    <h4>Color</h4>
                    <input type="color" value={this.state.color} onChange={(e) => this.setState({color: e.target.value})} />
                    <br/><br/>
                    <button disabled={this.state.input.trim() === ""} onClick={() => this.state.input ? this.login() : console.log("Can't submit an empty name!")}>Connect</button>
                </div>;
    }
}

export default Login;
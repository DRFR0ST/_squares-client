import React from 'react';

class SendBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        }
    }

    handleKeyPress = (e) => {
        if(e.key === "Enter") {
            this.props.sendMessage(this.state.input);
            this.setState({input: ""});
        }
    }

    render() {
        return  <div className="sendbox">
                    <input type="text" value={this.state.input} onKeyPress={this.handleKeyPress} onChange={(e) => this.setState({input: e.target.value})} />
                    <button onClick={() => {this.props.sendMessage(this.state.input); this.setState({input: ""});}}>Send</button>
                </div>;
    }
}

export default SendBox;
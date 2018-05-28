// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

class Events {
    constructor() {
        this.connection = new WebSocket('ws://127.0.0.1:1337');

        this.initialize();
    }

    initialize = () => {
        const env = this;
        this.connection.onopen = function () {
            env.onOpen();
        };

        this.connection.onmessage = function (message) {
            env.onMessage(message);
        };  

        this.connection.onerror = function (error) {
            env.onError(error);
        };

        setInterval(function() {
            if (env.connection.readyState !== 1) {
              env.onError('Unable to communicate with the WebSocket server.');
            }
          }, 3000);
    }

    onOpen = () => {
        return function() {};
    }

    onError = (response) => {
        return function(response) {};
    }

    onMessage = (response) => {
        return function(response) {};
    }
}

export default Events;
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import App from './core/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

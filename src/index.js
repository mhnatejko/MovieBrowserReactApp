import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Welcome from './components/Welcome';
import './styles/main.css';

ReactDOM.render(<Welcome />, document.getElementById('root'));
registerServiceWorker();

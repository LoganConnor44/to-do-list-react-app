import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todo from './components/to-do';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Todo />, document.getElementById('root'));

serviceWorker.register();
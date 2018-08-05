import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'todomvc-app-css/index.css'
import 'todomvc-common/base.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

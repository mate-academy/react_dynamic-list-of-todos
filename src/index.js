import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
const urlUsers = 'https://jsonplaceholder.typicode.com/users';

ReactDOM.render(<App urlTodos={urlTodos} urlUsers={urlUsers} />, document.getElementById('root'));
serviceWorker.unregister();

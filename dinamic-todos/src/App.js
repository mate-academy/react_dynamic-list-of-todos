import React, { Component } from 'react';
import TodoList from './components/TodoList';
import './App.css';

const serverUrl = ' https://jsonplaceholder.typicode.com/';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: null,
      users: null,
      todoList: null,
      loading: false
    }
  }

  get isReceived() {
    return this.state.todos && this.state.users;
  }

  get isLoaded() {
    return this.state.todoList !== null;
  }

  checkData() {
    if (!this.isReceived) return;
    const todosListMap = this.state.todos.map(todo => ({...todo,
      user: this.state.users.find(user => user.id === todo.userId)}));
    this.setState(state => ({
      todoList: todosListMap,
      loading: false
    }));
  }

  sendRequest(url, handler) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', handler(request));
    request.send();
  }

  requestTodosHandler = request => () => {
    const parseTodos = JSON.parse(request.responseText);
    this.setState(state => ({
      todos: parseTodos
    }));
    this.checkData();
  }

  requestUsersHandler = request => () => {
    const parseUsers = JSON.parse(request.responseText);
    this.setState(state => ({
      users: parseUsers
    }));
    this.checkData();
  }

  loadData = () => {
    this.setState(state => ({
      loading: true,
      todoList: null
    }));
    this.sendRequest(`${serverUrl}todos`, this.requestTodosHandler);
    this.sendRequest(`${serverUrl}users`, this.requestUsersHandler);
  }

  render() {
    if (this.isLoaded) {
      return (
        <div>
        <h1>Todo list</h1>
        <TodoList todoList={this.state.todoList} />
        </div>
      );
    } else {
      const button = (
        <button
          type="button"
          disabled={this.state.loading}
          onClick={this.loadData}
        >
          {this.state.loading ? 'Loading...' : 'Load data'}
        </button>);
      return (
        <div>
        <h1>Todo list</h1>
        {button}
        </div>
      );
    }
  }
}

export default App;

import TodoList from './components/TodoList';

import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedUsers: false,
      users: '',
      loadedTodos: false,
      todos: ''
    };
  }

  async requestUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    this.setState({
      loadedUsers: true,
      users: await response.json()
    });
  }

  async requestTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    this.setState({
      loadedTodos: true,
      todos: await response.json()
    });
  }

  render() {
    const { loadedUsers, loadedTodos, todos, users } = this.state;

    if (!loadedUsers && !loadedTodos) {
      return (
        <button
          onClick={() => {
            this.requestUsers();
            this.requestTodos();
          }}
        >
          Load
        </button>
      );
    } else if (loadedUsers && loadedTodos) {
      return <TodoList todos={todos} users={users} />;
    } else {
      return (
        <div>
          <button type='button' disabled>
            Loading...
          </button>
        </div>
      );
    }
  }
}


import TodoList from './components/TodoList';

import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedUsers: false,
      users: '',
      loadedTodos: false,
      todos: '',
    }    
  }

  async requestUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
        this.setState({
          loadedUsers: true,
          users: await response.json(),
        })
  }

  async requestTodos() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        this.setState({
          loadedTodos: true,
          todos: await response.json(),
        })
  }

  render() {
    if (!this.state.loadedUsers && !this.state.loadedTodos) {
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
    } else if (this.state.loadedUsers && this.state.loadedTodos) {
      return <TodoList todos={this.state.todos} users={this.state.users}/>;
    } else {
      return <div>Loading...</div>;
    }
  }
}


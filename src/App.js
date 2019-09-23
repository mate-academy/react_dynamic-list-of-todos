import React, { Component } from 'react';

import './App.css';
import TodoList from './components/TodoList/TodoList';

const todosUrl = `https://jsonplaceholder.typicode.com/todos`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

export default class App extends Component {
  state = {
    isLoaded: false,
    isLoading: false,
    todos: [],
    users: [],
  };

  onLoadClick = async () => {
    this.setState({ isLoading: true });

    try {
      const [ todosResponse, usersResponse ] = await Promise.all([
        fetch(todosUrl),
        fetch(usersUrl)
      ]);

      const todos = await todosResponse.json();
      const users = await usersResponse.json();

      this.setState({ todos, users, isLoaded: true });
    } catch (error) {
      console.warn(error);
    }
  };

  getTodosWithUsers = (todoArr, userArr) => (todoArr.map(todo => ({
    ...todo,
    user: userArr.find(item => item.id === todo.userId),
  })));

  showLoaderButton = () => (this.state.isLoading
    ? (
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </button>
    )
    : (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => this.onLoadClick()}
      >
        Load
      </button>
    ));

  render() {
    const { isLoaded, todos, users } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>

        {isLoaded
          ? <TodoList todos={this.getTodosWithUsers(todos, users)} />
          : this.showLoaderButton()}
      </div>
    );
  }
}

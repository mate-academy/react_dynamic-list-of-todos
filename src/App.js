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

  async onLoadClick() {
    this.setState({ isLoading: true });

    try {
      const response = await Promise.all([
        fetch(todosUrl),
        fetch(usersUrl)
      ]);

      const todos = await response[0].json();
      const users = await response[1].json();

      this.setState({ todos, users, isLoaded: true });
    } catch (error) {
      console.log('error');
    }
  }

  getTodosWithUsers = (todoArr, userArr) => (todoArr.map(todo => ({
    ...todo,
    user: userArr.find(item => item.id === todo.userId),
  })));

  render() {
    const { isLoading, isLoaded, todos, users } = this.state;

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>

        {isLoaded
          ? <TodoList todos={this.getTodosWithUsers(todos, users)} />
          : isLoading
            ? (
              <button className="btn btn-primary" type="button" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true">
                </span>
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
            )
        }
      </div>
    );
  }
}

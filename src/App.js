import React from 'react';
import './App.css';

import getTodosFromServer from './api/apiTodos';
import getUsersFromServer from './api/apiUsers';
import TodoList from './Components/TodoList/TodoList';

function getTodosWithUsers(todos, users) {
  return todos.map(todo => (
    {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }
  ));
}

class App extends React.Component {
  state = {
    todos: [],
    isLoading: false,
    originalTodos: [],
  }

  loadAllTodos = () => {
    this.setState({ isLoading: true });

    Promise.all([getTodosFromServer(), getUsersFromServer()])
      .then(([todos, users]) => {
        this.setState({
          todos: getTodosWithUsers(todos, users),
          originalTodos: getTodosWithUsers(todos, users),
          isLoading: false,
        });
      });
  }

  handleSortTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      }),
    }));
  }

  handleResetTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos],
    }));
  }

  render() {
    const { todos, isLoading } = this.state;

    if (isLoading) {
      return <p className="loading-text">TODOs are loading now...</p>;
    }

    if (todos.length === 0) {
      return (
        <button
          onClick={this.loadAllTodos}
          type="button"
          className="data-button"
        >
        Load all todos
        </button>
      );
    }

    return (
      <section className="section-wrapper">
        <div className="app">
          <h1 className="main-title">Static list of todos</h1>

          <p className="title">
            <span>TODOs: </span>
            {todos.length}
          </p>
          <button
            type="button"
            onClick={this.handleSortTodos}
            className="sort-button"
          >
            Press to sort by title
          </button>
          <button
            type="button"
            className="reset-button"
            onClick={this.handleResetTodos}
          >
            Press to reset
          </button>
          <TodoList todos={todos} />
        </div>
      </section>
    );
  }
}

export default App;

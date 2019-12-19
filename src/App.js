import React from 'react';
import './App.css';
import TodoList from './TodoList';

import { getTodos } from './api/todos';
import { getUsers } from './api/users';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    hasError: false,
  };

  loadTodosAndUsers = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    getTodos()
      .then((todos) => {
        this.setState({ todos });
      })
      .catch(() => {
        this.setState({ hasError: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });

    getUsers()
      .then((users) => {
        this.setState({ users });
      })
      .catch(() => {
        this.setState({ hasError: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { todos, users, isLoading, hasError } = this.state;

    function getTodoWithUsers(ListOfTodo, ListOfUsers) {
      return ListOfTodo.map(todo => (
        {
          ...todo,
          user: ListOfUsers.find(user => user.id === todo.userId),
        }));
    }

    const preparedTodos = getTodoWithUsers(todos, users);

    if (isLoading) {
      return (
        <div className="loader">
          <div className="spinner" />
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="App">
          <h1 className="heading">Error</h1>
          <button
            className="loadButton"
            type="button"
            onClick={this.loadTodosAndUsers}
          >
            Try again
          </button>
        </div>
      );
    }

    if ((todos.length === 0) || (users.length === 0)) {
      return (
        <div className="App">
          <h1 className="heading">Dynamic list of todos</h1>
          <button
            className="loadButton"
            type="button"
            onClick={this.loadTodosAndUsers}
          >
            Load TodoList
          </button>
        </div>
      );
    }

    return <TodoList todos={preparedTodos} />;
  }
}

export default App;

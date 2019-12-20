import React from 'react';
import './App.css';
import TodoList from './TodoList';

import { getTodos } from './api/todos';
import { getUsers } from './api/users';

class App extends React.Component {
  state = {
    data: [],
    isLoading: false,
    hasError: false,
  };

  loadTodosAndUsers = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    const dataTodos = getTodos();
    const dataUsers = getUsers();

    Promise.all([dataTodos, dataUsers]).then(([listOfTodos, listOfUsers]) => {
      this.setState({
        data: listOfTodos.map(todo => ({
          ...todo,
          user: listOfUsers.find(user => user.id === todo.userId),
        }
        )),
        isLoading: false,
      });
    })
      .catch(() => {
        this.setState({
          hasError: true,
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { data, isLoading, hasError } = this.state;

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

    if (data.length === 0) {
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

    return <TodoList todos={data} />;
  }
}

export default App;

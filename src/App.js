import React from 'react';
import TodoList from './components/TodoList/TodoList';

import './App.css';

function getTodosWithUsers(todosArray, usersMapApi) {
  return todosArray.map(todo => ({
    ...todo,
    user: usersMapApi[todo.userId],
  }));
}

class App extends React.Component {
  state = {
    preparedTodos: [],
    isLoading: false,
    hasError: false,
    isInitialized: false,
    isSorted: false,
  };

  receiveTodosAndUsers = () => {
    this.setState({
      isLoading: true,
      hasError: false,
      isInitialized: true,
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos'),
      fetch('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([responseTodos, responseUsers]) => Promise
        .all([responseTodos.json(), responseUsers.json()]))
      .then(([todos, users]) => {
        const usersMapApi = users
          .reduce((acum, user) => ({ ...acum, [user.id]: user }), {});

        const preparedTodos = getTodosWithUsers(todos, usersMapApi);

        this.setState({
          preparedTodos,
          sortedTodos: [...preparedTodos].sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }

            return 0;
          }),
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
          isLoading: false,
        });
      });
  }

  sortTodos = () => {
    this.setState(({ isSorted }) => ({
      isSorted: !isSorted,
    }));
  }

  render() {
    const {
      preparedTodos,
      isLoading,
      hasError,
      isInitialized,
      isSorted,
      sortedTodos,
    } = this.state;

    if (isLoading) {
      return <p className="loading">Loading...</p>;
    }

    if (hasError) {
      return (
        <>
          <h1 className="App__title">You want to upload again.</h1>
          <button
            type="button"
            className="btn btn-warning load load-again"
            onClick={this.receiveTodosAndUsers}
          >
            Load again
          </button>
        </>
      );
    }

    if (!isInitialized) {
      return (
        <>
          <h1 className="App__title">Want to upload a list of todos?</h1>
          <button
            type="button"
            className="btn btn-primary load"
            onClick={this.receiveTodosAndUsers}
          >
            Load
          </button>
        </>
      );
    }

    return (
      <div className="App">
        <button
          type="button"
          onClick={this.sortTodos}
          className="btn btn-primary load"
        >
          Sort
        </button>
        <TodoList todos={isSorted
          ? sortedTodos
          : preparedTodos}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

function getData(url) {
  return fetch(url)
    .then(respons => respons.json());
}

class App extends Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    hasError: false,
  }

  loadTodos = () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });
    const dataTodos = getData('https://jsonplaceholder.typicode.com/todos');
    const dataUsers = getData('https://jsonplaceholder.typicode.com/users');
    Promise.all([dataTodos, dataUsers]).then((data) => {
      const [listTodo, listUsers] = data;
      this.setState({
        todos: listTodo
          .map(item => ({
            ...item, user: listUsers.find(person => person.id === item.userId),
          })),
        users: [...listUsers],
        isLoading: false,
      });
    }).catch(() => this.setState({ hasError: true, isLoading: false }));
  }

  render() {
    const {
      todos,
      users,
      isLoading,
      hasError,
    } = this.state;
    const buttonText = (hasError ? 'Try again' : 'Load todos');

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        {todos.length === 0
          ? (
            <>
              <p>
                <strong>No yet todos</strong>
              </p>

              {hasError
                ? (
                  <p>
                    <span className="badge badge-warning">Error occurred!</span>
                  </p>
                )
                : null
              }

              <button
                type="button"
                className="btn btn-primary"
                onClick={this.loadTodos}
                disabled={isLoading}
              >
                {isLoading
                  ? 'Loading...'
                  : buttonText
                }
              </button>
            </>
          )
          : null}

        {isLoading
          ? (
            <>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </>
          )
          : null}

        <p>
          <span>Todos: </span>
          {todos.length}
        </p>
        <TodoList todos={todos} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>
      </div>
    );
  }
}

export default App;

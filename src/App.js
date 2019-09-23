import React, { Component } from 'react';
import Button from './components/Button/Button';
import TodoList from './components/TodoList/TodoList';

import './App.css';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

class App extends Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
  };

  // componentDidMount() {
  //   Promise.all([
  //     fetch(TODOS_URL),
  //     fetch(USERS_URL),
  //   ])
  //     .then(([resTodos, resUsers]) => Promise.all(
  //       [resTodos.json(), resUsers.json()]
  //     ))
  //     .then(([dataTodos, dataUsers]) => this.setState({
  //       todos: dataTodos,
  //       users: dataUsers,
  //     }));
  // }

  getTodosWithUsers = (todosList, usersList) => todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }))

  handleShow = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(TODOS_URL),
      fetch(USERS_URL),
    ])
      .then(([resTodos, resUsers]) => Promise.all(
        [resTodos.json(), resUsers.json()]
      ))
      .then(([dataTodos, dataUsers]) => this.setState({
        todos: dataTodos,
        users: dataUsers,
        isLoading: false,
      }));
  };

  render() {
    const {
      todos,
      users,
      isLoading,
    } = this.state;

    const preparedTodos = this.getTodosWithUsers(todos, users);

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <div className="container">

          <div className="content">
            {todos.length === 0
              ? (
                <>
                  {isLoading
                    ? (
                      <button
                        className="btn btn-primary"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Loading...</span>
                      </button>
                    )
                    : ''
                  }
                  <div>
                    <Button
                      className="btn--start"
                      text="Load"
                      onClick={this.handleShow}
                    />
                  </div>
                </>
              )
              : (
                <>
                  <p>
                    <span>Todos: </span>
                    {todos.length}
                  </p>

                  <p>
                    <span>Users: </span>
                    {users.length}
                  </p>
                  <TodoList todos={preparedTodos} />
                </>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;

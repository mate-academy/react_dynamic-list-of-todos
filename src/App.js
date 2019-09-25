import React from 'react';
import './App.css';

import TodoList from './components/TodoList/TodoList';

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

function getTodosWithUsers(todosList, usersList) {
  return todosList.map(todo => ({
    ...todo,
    user: usersList.find(user => user.id === todo.userId),
  }));
}

class App extends React.Component {
  state = {
    preparedTodos: [],
    isLoading: false,
    error: null,
    isShowButton: true,
  }

  loadTodos = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(TODOS_URL),
      fetch(USERS_URL),
    ])
      .then(([todosResponse, usersResponse]) => (
        Promise.all([todosResponse.json(), usersResponse.json()])))
      .then(([todosData, usersData]) => this.setState({
        isLoading: false,
        isShowButton: false,
        preparedTodos: getTodosWithUsers(todosData, usersData),
      }))
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: err,
        });
      });
  }

  render() {
    console.log(this.state.preparedTodos);
    const {
      preparedTodos, isLoading, error, isShowButton,
    } = this.state;

    if (isLoading) {
      return (
        <div className="App todo-list">
          <button
            className="button"
            type="button"
            disabled
          >
            Loading...
          </button>
        </div>
      );
    }

    if (error) {
      return (
        <div className="App todo-list">
          <div>{`Error: ${error.message} data`}</div>
          <button
            className="button"
            type="button"
            onClick={this.loadTodos}
          >
            Reload
          </button>
        </div>
      );
    }

    return (
      <div className="App todo-list">
        {isShowButton && (
          <button
            className="button"
            type="button"
            onClick={this.loadTodos}
          >
            Load
          </button>
        )}
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;

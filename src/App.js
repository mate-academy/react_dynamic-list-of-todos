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
    initPreparedTodos: [],
    preparedTodos: [],
    isLoading: false,
    error: null,
    isShowButton: true,
    isShowOnlyCompleted: false,
    isSortedByTitle: false,
    isSortedByUserName: false,
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
        initPreparedTodos: getTodosWithUsers(todosData, usersData),
        preparedTodos: getTodosWithUsers(todosData, usersData),
      }))
      .catch((err) => {
        this.setState({
          isLoading: false,
          error: err,
        });
      });
  }

  toggleCompleted = () => {
    if (!this.state.isShowOnlyCompleted) {
      this.setState(prevState => ({
        preparedTodos: [...prevState.preparedTodos].filter(todo => todo.completed),
        isShowOnlyCompleted: true,
      }));
    } else {
      this.setState(prevState => ({
        preparedTodos: [...prevState.initPreparedTodos],
        isShowOnlyCompleted: false,
        isSortedByTitle: false,
        isSortedByUserName: false,
      }));
    }
  }

  toggleSortByTitle = () => {
    if (!this.state.isSortedByTitle) {
      this.setState(prevState => ({
        preparedTodos: [...prevState.preparedTodos].sort((a, b) => a.title.localeCompare(b.title)),
        isSortedByTitle: true,
      }));
    } else {
      this.setState(prevState => ({
        preparedTodos: [...prevState.initPreparedTodos],
        isSortedByTitle: false,
        isSortedByUserName: false,
        isShowOnlyCompleted: false,
      }));
    }
  }

  toggleSortByUserName = () => {
    if (!this.state.isSortedByUserName) {
      this.setState(prevState => ({
        preparedTodos: [...prevState.preparedTodos].sort((a, b) => a.user.name.localeCompare(b.user.name)),
        isSortedByUserName: true,
      }));
    } else {
      this.setState(prevState => ({
        preparedTodos: [...prevState.initPreparedTodos],
        isSortedByUserName: false,
        isSortedByTitle: false,
        isShowOnlyCompleted: false,
      }));
    }
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
        )
          || (
            <>
              {this.state.isShowOnlyCompleted
                ? (
                  <button
                    className="button"
                    type="button"
                    onClick={this.toggleCompleted}
                  >
                    show all

                  </button>
                )
                : (
                  <button
                    className="button"
                    type="button"
                    onClick={this.toggleCompleted}
                  >
                    show completed
                  </button>
                )}
              {this.state.isSortedByTitle
                ? (
                  <button
                    type="button"
                    className="button"
                    onClick={this.toggleSortByTitle}
                  >
                    show all
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="button"
                    onClick={this.toggleSortByTitle}
                  >
                    sort by title
                  </button>
                )
              }
              {this.state.isSortedByUserName
                ? (
                  <button
                    type="button"
                    className="button"
                    onClick={this.toggleSortByUserName}
                  >
                    show all
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="button"
                    onClick={this.toggleSortByUserName}
                  >
                    sort by User
                  </button>
                )
              }
            </>
          )
        }
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;

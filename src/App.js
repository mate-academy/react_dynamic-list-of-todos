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

  handleTodosSort = ({ target: { value } }) => {
    switch (value) {
      case 'completed':
        this.setState(prevState => ({
          preparedTodos: [...prevState.initPreparedTodos].filter(todo => (
            prevState.isShowOnlyCompleted
              ? !todo.completed
              : todo.completed)),
          isShowOnlyCompleted: !prevState.isShowOnlyCompleted,
          isSortedByUserName: false,
          isSortedByTitle: false,
        }));
        break;

      case 'title':
        this.setState(prevState => ({
          preparedTodos: [...prevState.initPreparedTodos].sort((a, b) => (
            prevState.isSortedByTitle
              ? null
              : a.title.localeCompare(b.title))),
          isSortedByTitle: !prevState.isSortedByTitle,
          isSortedByUserName: false,
          isShowOnlyCompleted: false,
        }));
        break;

      case 'user':
        this.setState(prevState => ({
          preparedTodos: [...prevState.initPreparedTodos].sort((a, b) => (
            prevState.isSortedByUserName
              ? null
              : a.user.name.localeCompare(b.user.name))),
          isSortedByUserName: !prevState.isSortedByUserName,
          isShowOnlyCompleted: false,
          isSortedByTitle: false,
        }));
        break;

      default:
        this.setState(prevState => ({
          preparedTodos: prevState.initPreparedTodos,
        }));
    }
  }

  render() {
    const {
      preparedTodos,
      isLoading,
      error,
      isShowButton,
      isShowOnlyCompleted,
      isSortedByTitle,
      isSortedByUserName,
    } = this.state;

    if (isLoading) {
      return (
        <div className="App todo-list">
          <h1>Dynamic list of todos</h1>
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
        <h1>Dynamic list of todos</h1>
        {isShowButton
          ? (
            <button
              className="button"
              type="button"
              onClick={this.loadTodos}
            >
              Load
            </button>
          )
          : (
            <>
              <button
                className="button"
                type="button"
                onClick={this.handleTodosSort}
                value="completed"
              >
                {isShowOnlyCompleted ? 'show initial list' : 'show completed'}
              </button>

              <button
                type="button"
                className="button"
                onClick={this.handleTodosSort}
                value="title"
              >
                {isSortedByTitle ? 'show initial list' : 'sort by title'}
              </button>

              <button
                type="button"
                className="button"
                onClick={this.handleTodosSort}
                value="user"
              >
                {isSortedByUserName ? 'show initial list' : 'sort by User'}
              </button>
            </>
          )
        }
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;

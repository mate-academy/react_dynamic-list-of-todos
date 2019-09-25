import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import getTodosWithUsers from './dataMappers';
import './App.css';

const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = dataName => (
  fetch(`${API_URL}${dataName}`)
    .then(response => response.json())
);

class App extends Component {
  state = {
    todosList: [],
    sortedTodosList: [],
    isLoaded: false,
    isLoading: false,
    isError: false,
    buttonText: 'Load',
  }

  loadDataFromServer = () => {
    this.setState({
      buttonText: 'loading...',
      isLoading: true,
    });

    Promise.all([
      getData('todos'),
      getData('users'),
    ])
      .then(([todos, users]) => this.setState({
        todosList: getTodosWithUsers(todos, users),
        sortedTodosList: getTodosWithUsers(todos, users),
        isLoaded: true,
        isLoading: false,
      }))
      .catch(() => this.setState({
        buttonText: 'try again',
        isError: true,
        isLoading: false,
      }));
  }

  resetList = () => {
    this.setState(prevState => ({
      sortedTodosList: [...prevState.todosList],
    }));
  };

  sortByTitle = () => {
    this.setState(prevState => ({
      sortedTodosList: [...prevState.todosList]
        .sort((todo1, todo2) => {
          if (todo1.title < todo2.title) {
            return -1;
          }
          if (todo1.title > todo2.title) {
            return 1;
          }

          return 0;
        }),
    }));
  };

  sortByName = () => {
    this.setState(prevState => ({
      sortedTodosList: [...prevState.todosList]
        .sort((todo1, todo2) => {
          if (todo1.user.name < todo2.user.name) {
            return -1;
          }
          if (todo1.user.name < todo2.user.name) {
            return 1;
          }

          return 0;
        }),
    }));
  };

  sortCompleted = () => {
    this.setState(prevState => ({
      sortedTodosList: [
        ...prevState.todosList.filter(todo => todo.completed),
        ...prevState.todosList.filter(todo => !todo.completed),
      ],
    }));
  };

  render() {
    const {
      sortedTodosList,
      isLoaded,
      isLoading,
      buttonText,
      isError,
    } = this.state;

    if (!isLoaded) {
      return (
        <div>
          {isError
            ? <p>No Data :( Try again</p>
            : null
          }
          <button
            type="submit"
            disabled={isLoading}
            onClick={this.loadDataFromServer}
          >
            {buttonText}
          </button>
        </div>
      );
    }

    return (
      <div>
        <button
          type="submit"
          onClick={this.sortByName}
        >
          Sort by Name
        </button>
        <button
          type="submit"
          onClick={this.sortByTitle}
        >
          Sort by Title
        </button>
        <button
          type="submit"
          onClick={this.sortCompleted}
        >
          Sort by Comleted
        </button>
        <button
          type="submit"
          onClick={this.resetList}
        >
          Reset
        </button>
        <TodoList todos={sortedTodosList} />
      </div>

    );
  }
}

export default App;

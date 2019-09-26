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
    errorText: null,
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
        errorText: <p>No Data :( Try again</p>,
        isLoading: false,
      }));
  }

  sortPosts = (event) => {
    const { value } = event.target;

    this.setState((prevState) => {
      switch (value) {
        case 'name': return {
          sortedTodosList: [...prevState.todosList]
            .sort((todo1, todo2) => (
              todo1.user.name.localeCompare(todo2.user.name))),
        };
        case 'title': return {
          sortedTodosList: [...prevState.todosList]
            .sort((todo1, todo2) => todo1.title.localeCompare(todo2.title)),
        };
        case 'completed': return {
          sortedTodosList: [
            ...prevState.todosList.filter(todo => todo.completed),
            ...prevState.todosList.filter(todo => !todo.completed),
          ],
        };
        default: return {
          sortedTodosList: [...prevState.todosList],
        };
      }
    });
  };

  render() {
    const {
      sortedTodosList,
      isLoaded,
      isLoading,
      buttonText,
      errorText,
    } = this.state;

    if (!isLoaded) {
      return (
        <div>
          {errorText}
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
          value="name"
          type="submit"
          onClick={this.sortPosts}
        >
          Sort by Name
        </button>
        <button
          value="title"
          type="submit"
          onClick={this.sortPosts}
        >
          Sort by Title
        </button>
        <button
          value="completed"
          type="submit"
          onClick={this.sortPosts}
        >
          Sort by Comleted
        </button>
        <button
          type="submit"
          onClick={this.sortPosts}
        >
          Reset
        </button>
        <TodoList todos={sortedTodosList} />
      </div>
    );
  }
}

export default App;

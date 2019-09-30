import React, { Component } from 'react';
import './App.css';

import TodoList from './components/TodoList/TodoList';

const todosUrl = `https://jsonplaceholder.typicode.com/todos`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

class App extends Component {
  state = {
    todos: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  }

  handleClick = async() => {
    this.setState({ isLoading: true });

    try {
      const [todosResponse, usersResponse] = await Promise.all([
        fetch(todosUrl),
        fetch(usersUrl),
      ]);

      const todos = await todosResponse.json();
      const users = await usersResponse.json();

      const preparedTodos = todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      }));

      this.setState({
        todos: preparedTodos,
        originalTodos: preparedTodos,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
    }
  };

  sortByTitle = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort(
        (a, b) => a.title.localeCompare(b.title)
      ),
    }));
  }

  sortByUser = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort(
        (a, b) => a.user.name.localeCompare(b.user.name)
      ),
    }));
  }

  sortCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort(
        todo => todo.completed ? 1 : -1
      ),
    }));
  }

  resetTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos],
    }));
  }

  render() {
    const {
      todos,
      isLoading,
      isLoaded,
      hasError,
    } = this.state;

    return (
      <div className="App">
        {isLoaded ? (
          <>
            <h1 className="title">Dynamic list of todos</h1>
            <button
              type="button"
              onClick={this.sortByTitle}
              className="button button__sort"
            >
              Sort by title
            </button>
            <button
              type="button"
              onClick={this.sortByUser}
              className="button button__sort"
            >
              Sort by user
            </button>
            <button
              type="button"
              onClick={this.sortCompleted}
              className="button button__sort"
            >
              Sort by completed
            </button>
            <button
              type="button"
              onClick={this.resetTodos}
              className="button button__reset"
            >
              Reset
            </button>
            <TodoList todos={todos} />
          </>
        ) : (
          <>
            <h1 className="title">
              {hasError ? 'Error: Failed to fetch' : 'Load todos' }
            </h1>
            <button type="button" onClick={this.handleClick}>
              {isLoading ? 'Loading...' : hasError ? 'Try Again' : 'Load'}
            </button>
          </>
        )}
      </div>
    );
  }
}

export default App;

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
        user: users.find(item => item.id === todo.userId),
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

  sortByName = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort(
        (a, b) => a.title.localeCompare(b.title)
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
              onClick={this.sortByName}
              className="button button__sort"
            >
              Sort
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

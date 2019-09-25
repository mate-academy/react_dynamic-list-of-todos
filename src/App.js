import React, { Component } from 'react';
import './App.css';

import TodoList from './components/TodoList/TodoList';

const todosUrl = `https://jsonplaceholder.typicode.com/todos`;
const usersUrl = `https://jsonplaceholder.typicode.com/users`;

class App extends Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    isLoaded: false,
    hasError: false,
  }

  getTodosWithUsers = (todoArr, userArr) => (todoArr.map(todo => ({
    ...todo,
    user: userArr.find(item => item.id === todo.userId),
  })));

  handleClick = async() => {
    this.setState({ isLoading: true });

    try {
      const [todosResponse, usersResponse] = await Promise.all([
        fetch(todosUrl),
        fetch(usersUrl),
      ]);

      const todos = await todosResponse.json();
      const users = await usersResponse.json();

      this.setState({
        todos,
        users,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
        isLoading: false,
      });
    }
  };

  render() {
    const {
      todos,
      users,
      isLoading,
      isLoaded,
      hasError,
    } = this.state;

    return (
      <div className="App">
        {isLoaded ? (
          <>
            <h1 className="title">Static list of todos</h1>
            <TodoList todos={this.getTodosWithUsers(todos, users)} />
          </>
        ) : (
          <>
            <h1>
              {hasError ? 'Error: Failed to fetch' : 'Load Todos' }
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

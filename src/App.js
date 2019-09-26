import React from 'react';
import './App.css';

import TodoList from './TodoList/TodoList';

const URL = 'https://jsonplaceholder.typicode.com';

class App extends React.Component {
  state = {
    todos: [],
    isLoading: false,
    isLoaded: false,
    error: null,
  }

  loadData = async() => {
    this.setState({ isLoading: true });

    try {
      const [todosResponse, usersResponse] = await Promise.all([
        fetch(`${URL}/todos`),
        fetch(`${URL}/users`),
      ]);

      const todos = await todosResponse.json();
      const users = await usersResponse.json();

      const todosWithUsers = todos.map(({ userId, ...rest }) => ({
        ...rest,
        user: users.find(({ id }) => id === userId),
      }));

      this.setState({
        todos: todosWithUsers,
        isLoaded: true,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    const {
      todos,
      isLoading,
      isLoaded,
      error,
    } = this.state;

    if (!isLoaded) {
      return (
        <button
          type="button"
          onClick={this.loadData}
          disabled={isLoading}
        >
          {isLoading ? 'Loading' : 'Load Todos'}
        </button>
      );
    }

    if (error) {
      return <p>Error!!!</p>;
    }

    return (
      <TodoList todos={todos} />
    );
  }
}

export default App;

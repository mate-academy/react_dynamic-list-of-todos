import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class App extends React.Component {
  state = {
    todos: [],
    isLoading: false,
    isLoaded: false,
    error: null,
  }

  componentDidMount() {
  }

  loadData = async() => {
    this.setState({ isLoading: true });

    try {
      const [todosResponse, usersResponse] = await Promise.all([
        fetch(`${BASE_URL}/todos`),
        fetch(`${BASE_URL}/users`),
      ]);
      const todos = await todosResponse.json();
      const users = await usersResponse.json();

      const todosWithUsers = todos.map(({ userId, ...rest }) => ({
        ...rest,
        user: users.find(({ id }) => id === userId),
      }));

      console.log(todosWithUsers);

      this.setState({
        todos: todosWithUsers,
        isLoaded: true,
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

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
          {isLoading ? 'Getting...' : 'Get TODOs'}
        </button>
      );
    }

    if (error) {
      return <p>{error}</p>;
    }

    return (
      <TodoList todos={todos} />
    );
  }
}

export default App;

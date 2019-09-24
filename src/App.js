import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

class App extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
    hasError: false,
  };

  loadTodos = async () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    try {
      const [todosResponse, usersResponse] = await Promise.all([
        fetch(`${BASE_URL}/todos`),
        fetch(`${BASE_URL}/users`),
      ]);

      const todos = await todosResponse.json();
      const users = await usersResponse.json();
      const todosWithUsers = todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      }));

      this.setState({
        todos: todosWithUsers,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({
        hasError: true,
      });
    }

    this.setState({
      isLoading: false,
    });
  };

  sortByTitle = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort((a, b) => (a.title > b.title ? 1 : -1)),
    }));
  };

  sortByUser = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort((a, b) => a.userId - b.userId),
    }));
  };

  sortByCompleteness = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].sort((a, b) => a.completed - b.completed),
    }));
  };

  render() {
    const {
      todos,
      isLoaded,
      isLoading,
      hasError,
    } = this.state;

    return (
      <>
        <h1 className="header">Static list of todos</h1>
        {isLoaded ? (
          <div>
            <TodoList
              todos={todos}
              sortByTitle={this.sortByTitle}
              sortByUser={this.sortByUser}
              sortByCompleteness={this.sortByCompleteness}
            />
          </div>
        ) : (
          <>
            {hasError && (
              <h2 className="error-title">Oh, failed, try again</h2>
            )}
            <button
              type="button"
              className="load-button"
              onClick={this.loadTodos}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load todos'}
            </button>
          </>
        )}
      </>
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';
const USERS_API = 'https://jsonplaceholder.typicode.com/users';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
    hasError: false,
    showButton: true,
  }

  getTodosWithUsers = (todos, users) => todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId)
  }));

  handleLoadingData = () => {
    this.setState({
      isLoading: true,
      showButton: false,
    });

    Promise.all([
      fetch(`${TODOS_API}`),
      fetch(`${USERS_API}`),
    ]).then(([todos, users]) => Promise.all([
      todos.json(),
      users.json(),
    ])).then(([todosData, usersData]) => this.setState({
      todos: [...todosData],
      users: [...usersData],
    })).finally(() => this.setState({
      isLoading: false,
    })).catch(() => this.setState({
      hasError: true,
    }));
  }

  render() {
    const {
      todos,
      users,
      isLoading,
      hasError,
      showButton,
    } = this.state;

    const {
      getTodosWithUsers,
      handleLoadingData,
    } = this;

    if (isLoading) {
      return (
        <div className="balls">
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="error">
          <div className="error__title">Error 404</div>
          <p className="error__text">Page not found</p>
        </div>
      );
    }

    return (
      <div className="App">
        <h1 className="title">Dynamic list of todos</h1>
        {showButton &&
          <button
            type="button"
            onClick={handleLoadingData}
            className="button"
          >
            Show more!!!
          </button>
        }
        <TodoList
          todos={getTodosWithUsers(todos, users)}
        />
      </div>
    );
  }
}

export default App;

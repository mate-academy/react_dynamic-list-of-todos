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

export default class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoaded: false,
    isLoading: false,
    hasError: false,
  };

  getApi = url => fetch(url).then(response => response.json());

  loadTodos = async () => {
    this.setState({
      isLoading: true,
      hasError: false,
    });

    try {
      const [todos, users] = await Promise.all([
        this.getApi(TODOS_URL),
        this.getApi(USERS_URL),
      ]);

      this.setState({
        todos,
        users,
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

  render() {
    const {
      todos,
      users,
      isLoaded,
      isLoading,
      hasError,
    } = this.state;
    const preparedTodos = getTodosWithUsers(todos, users);

    return (
      <>
        <h1 className="header">Static list of todos</h1>

        {isLoaded ? (
          <div>
            <TodoList todos={preparedTodos} />
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
            >
              {isLoading ? 'Loading...' : 'Load todos'}
            </button>
          </>
        )}
      </>
    );
  }
}

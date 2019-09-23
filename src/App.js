import React from 'react';

import TodoList from './components/TodoList/TodoList';
import './App.css';

const todosFromApi = 'https://jsonplaceholder.typicode.com/todos';
const usersFromApi = 'https://jsonplaceholder.typicode.com/users';

class App extends React.Component {
  state = {
    todos: [],
    users: [],
    isLoading: false,
  };

  getTodosWithUsers = (todos, users) => todos.map(item => ({
    ...item,
    user: users.find(user => user.id === item.userId),
  }));

  loadData = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch(todosFromApi),
      fetch(usersFromApi),
    ])
      .then(([todos, users]) => Promise.all([
        todos.json(),
        users.json(),
      ]))
      .then(([dataTodos, dataUsers]) => this.setState({
        todos: [...dataTodos],
        users: [...dataUsers],
        isLoading: false,
      }));
  };

  render() {
    const { users, todos, isLoading } = this.state;

    const todosWithUsers = this.getTodosWithUsers(todos, users);

    if (isLoading) {
      return <p className="loading">Loading...</p>;
    }

    if (todosWithUsers.length === 0) {
      return (
        <div className="container">
          <h1 className="todos-title">Dynamic List of Todos</h1>
          <p className="no-todos-list">No todos yet</p>
          <button
            type="button"
            onClick={this.loadData}
            className="info-load"
          >
            Load
          </button>
        </div>
      );
    }

    return <TodoList todos={todosWithUsers} />;
  }
}

export default App;

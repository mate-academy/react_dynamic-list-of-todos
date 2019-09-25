import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

class App extends Component {
  state ={
    todos: [],
    isLoading: false,
    isLoaded: false,
    isSorted: false,
    selectedSort: 'Do not sort',
  }

  getTodos = () => {
    this.setState({
      isLoading: true,
    });

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/todos'),
      fetch('https://jsonplaceholder.typicode.com/users'),
    ])
      .then(([todos, users]) => Promise.all([todos.json(), users.json()]))
      .then(([todos, users]) => {
        const usersMap = users
          .reduce((acc, currentUser) => ({
            ...acc,
            [currentUser.id]: currentUser.name,
          }), {});

        const preparedTodos = todos.map(todo => ({
          ...todo,
          user: usersMap[todo.userId],
        }));

        this.setState({
          todos: preparedTodos,
          sortedTodos: preparedTodos,
          isLoaded: true,
        });
      });
  }

  sortTodos = (value) => {
    this.setState(({ todos }) => ({
      isSorted: value !== 'Do not sort',
      selectedSort: value,
      sortedTodos: [...todos].sort((a, b) => {
        if (value === 'By user name') {
          return a.user.localeCompare(b.user);
        }

        if (value === 'By title') {
          return a.title.localeCompare(b.title);
        }

        if (value === 'TODO/Completed') {
          return a.completed ? 1 : -1;
        }
      }),
    }));
  }

  render() {
    const {
      sortedTodos,
      todos,
      isLoading,
      isLoaded,
      isSorted,
      selectedSort,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title">Dynamic list of todos</h1>
        {(isLoaded && (
          <>
            Sort by:
            {' '}
            <select
              type="button"
              value={selectedSort}
              onChange={e => this.sortTodos(e.target.value)}
              className="mb-3"
            >
              <option value="Do not sort">Do not sort</option>
              <option value="By user name">By user name</option>
              <option value="By title">By title</option>
              <option value="TODO/Completed">TODO/Completed</option>
            </select>
            <TodoList todos={isSorted
              ? sortedTodos
              : todos}
            />
          </>
        ))
          || (isLoading && (
            <button type="button">
              loading...
            </button>
          ))
          || (
            <button type="button" onClick={this.getTodos}>
              Get todos
            </button>
          )
        }
      </div>
    );
  }
}

export default App;

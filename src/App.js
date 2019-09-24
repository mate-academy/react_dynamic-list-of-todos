import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';

class App extends Component {
  state ={
    todos: [],
    isLoading: false,
    isLoaded: false,
    isSorted: false,
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
          sortedTodos: [...preparedTodos].sort(a => (a.completed ? 1 : -1)),
          isLoaded: true,
        });
      });
  }

  sort = () => {
    this.setState(({ isSorted }) => ({
      isSorted: !isSorted,
    }));
  }

  render() {
    const {
      sortedTodos,
      todos,
      isLoading,
      isLoaded,
      isSorted,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title">Dynamic list of todos</h1>
        {(isLoaded && (
          <>
            <button
              type="button"
              onClick={this.sort}
              className="mb-3"
            >
              Sort
            </button>
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

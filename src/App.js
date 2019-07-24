import React from 'react';
import TodoList from './components/TodoList';

import './App.css';
import { getTodos, getUsers } from './api/data';

const getSortedTodos = (todos, key) => {
  let callback = (typeof todos[0][key] === 'string')
    ? (todoA, todoB) => todoA[key].localeCompare(todoB[key])
    : (todoA, todoB) => todoA[key] - todoB[key];

  if (key === 'user') {
    callback = (todoA, todoB) => todoA.user.name.localeCompare(todoB.user.name);
  }
  return [...todos].sort(callback);
};

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
    isLoaded: false,
    isLoading: false,
    sortField: 'id',
  };

  sortBy = (sortField) => {
    this.setState(prevState => ({
      visibleTodos: getSortedTodos(prevState.todos, sortField),
      sortField,
    }));
  };

  handleClick = async() => {
    const todos = await getTodos();
    const users = await getUsers();
    const todosWithUser = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
    this.setState({
      isLoading: true,
    });

    setTimeout(() => {
      this.setState({
        todos: todosWithUser,
        visibleTodos: getSortedTodos(todosWithUser, 'id'),
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  };

  render() {
    const {
      visibleTodos, isLoaded, isLoading, sortField,
    } = this.state;

    return (
      <div className="App">
        {isLoaded
          ? (
            <>
              <h2>
                {visibleTodos.length}
                {' '}
                todos were sorted by
                {' '}
                {sortField}
              </h2>
              <button
                type="button"
                className="button-sort"
                onClick={() => this.sortBy('completed')}
              >
                completed
              </button>

              <button
                type="button"
                className="button-sort"
                onClick={() => this.sortBy('id')}
              >
                ID
              </button>

              <button
                type="button"
                className="button-sort"
                onClick={() => this.sortBy('title')}
              >
                title
              </button>

              <button
                type="button"
                className="button-sort"
                onClick={() => this.sortBy('user')}
              >
                user
              </button>

              <TodoList
                todos={visibleTodos}
              />
            </>
          ) : (
            <>
              <h1>Todo List</h1>
              <button
                disabled={isLoading}
                type="button"
                className="button-load"
                onClick={this.handleClick}
              >
                {isLoading ? 'Loading...' : 'Load'}
              </button>
            </>
          )
        }
      </div>
    );
  }
}
export default App;

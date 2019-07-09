import React from 'react';
import TodoList from './TodoList';
import { getTodos, getUsers } from './getDataFromServer';

import './App.css';

const getSortedTodos = (todos, key) => {
  let callback = (typeof todos[0][key] === 'string')
    ? (todoA, todoB) => todoA[key].localeCompare(todoB[key])
    : (todoA, todoB) => todoA[key] - todoB[key];

  if (key === 'user') {
    callback = (todoA, todoB) => todoA.user.name.localeCompare(todoB.user.name);
  }

  return todos.sort(callback);
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
    this.setState({
      todos: getSortedTodos(this.state.todos, sortField),
      sortField: sortField,
    });
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
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  render() {
    const { todos, sortField } = this.state;

    return (
      <section className="table__blur">
        {this.state.isLoaded ? (
          <div className="table__blur">
            <h1>Todo List</h1>
            <h2 className="table__name">Todo List was sorted by {sortField}</h2>

            <button onClick={() => this.sortBy('completed')}>Completed</button>
            <button onClick={() => this.sortBy('id')}>ID</button>
            <button onClick={() => this.sortBy('user')}>User</button>
            <button onClick={() => this.sortBy('title')}>Title</button>

            <TodoList
              items={this.state.todos}
            />
          </div>
        ) : (
          <div>
            <button className="todo__front" type="submit" onClick={this.handleClick}>
              {this.state.isLoading ? 'Loading...' : 'Load'}
            </button>
          </div>
        )}
      </section>
    );
  }
}

export default App;

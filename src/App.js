import React from 'react';
import TodoList from './TodoList';
import { getTodos, getUsers } from './getDataFromServer';

import './App.css';

const getSortedTodos = (todos, key, direction) => {
  let callback;

  if (typeof todos[0][key] === 'string') {
    if (direction) {
      callback = (todoA, todoB) => todoB[key].localeCompare(todoA[key]);
    } else {
      callback = (todoA, todoB) => todoA[key].localeCompare(todoB[key]);
    }
  } else {
    if (direction) {
      callback = (todoA, todoB) => todoB[key] - todoA[key];
    } else {
      callback = (todoA, todoB) => todoA[key] - todoB[key];
    }
  }

  if (key === 'user') {
    if (direction) {
      callback = (todoA, todoB) => todoA.user.name.localeCompare(todoB.user.name);
    } else {
      callback = (todoA, todoB) => todoB.user.name.localeCompare(todoA.user.name);
    }
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
    sortDirection: false,
  };

  sortBy = (sortField) => {
    this.setState(prevState => ({
      visibleTodos: getSortedTodos(this.state.todos, sortField, this.state.sortDirection),
      sortField: sortField,
      sortDirection: !prevState.sortDirection,
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
        visibleTodos: todosWithUser,
        isLoaded: true,
        isLoading: false,
      });
    }, 2000);
  };

  render() {
    const { visibleTodos, sortField } = this.state;

    return (
      <section className="table__blur">
        {this.state.isLoaded ? (
          <div className="table__blur">

            <h2 className="table__name">Todo List was sorted by {sortField}</h2>

            <table className="table__blur">
              <thead>
                <tr>
                  <th onClick={() => this.sortBy('id')}>ID <span className="table__arrow">↓↑</span></th>
                  <th onClick={() => this.sortBy('completed')}>Completed <span className="table__arrow">↓↑</span></th>
                  <th onClick={() => this.sortBy('title')}>Title <span className="table__arrow">↓↑</span></th>
                  <th onClick={() => this.sortBy('user')}>User <span className="table__arrow">↓↑</span></th>
                </tr>
              </thead>

              <TodoList
                items={visibleTodos}
              />

            </table>
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

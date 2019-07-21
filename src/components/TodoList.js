import React from 'react';

import TodoItem from './TodoItem';
import { getTodos, getUsers } from './getData';

class TodoList extends React.Component {
  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

  handleClick = async() => {
    this.setState({
      isLoading: true,
    });

    const todos = await getTodos();
    const users = await getUsers();
    const preparedPostsList = todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));

    this.setState({
      todos: preparedPostsList,
      isLoaded: true,
      isLoading: false,
    });
  };

  sortBy = (item) => {
    this.setState(state => ({
      todos: [...state.todos].sort((a, b) => {
        switch (item) {
          case 'id':
            return a[item] - b[item];

          case 'name':
            return a.user[item].localeCompare(b.user[item]);

          case 'title':
            return a[item].localeCompare(b[item]);

          case 'completed':
            return b[item] - a[item];

          default:
            return a[item] - b[item];
        }
      }),
    }));
  };

  render() {
    return (
      <main>
        {this.state.isLoaded
          ? (
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => this.sortBy('id')}>ID</th>
                  <th onClick={() => this.sortBy('name')}>Name</th>
                  <th onClick={() => this.sortBy('title')}>Task</th>
                  <th onClick={() => this.sortBy('completed')}>Status</th>
                </tr>
              </thead>

              <tbody>
                {this.state.todos.map(todo => (
                  <TodoItem todo={todo} key={todo.id} />
                ))}
              </tbody>
            </table>
          )
          : (
            <button
              className="start-btn"
              type="button"
              onClick={this.handleClick}
            >
              {this.state.isLoading
                ? 'Loading...'
                : 'Load'
              }
            </button>
          )}
      </main>
    );
  }
}

export default TodoList;

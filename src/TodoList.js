import React from 'react'

import TodoItem from './TodoItem';
import getTodos from './GetTodos';
import getUsers from './GetUsers';
import { async } from 'q';


class TodoList extends React.Component {

  state = {
    todos: [],
    isLoaded: false,
    isLoading: false,
  };

  handleClick = async () => {
    this.setState({
      isLoading: true,
    });

    const todos = await getTodos();
    const users = await getUsers();
    const listPostWithUser = todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    }));

    setTimeout(() => {
      this.setState({
        todos: listPostWithUser,
        isLoaded: true,
        isLoading: false,
      });
    }, 1000);
  };

  sortData = (sortItem) => {
    this.setState(state => ({
      todos: [...state.todos].sort((a, b) => {
        switch (sortItem) {
          case 'completed':
            return b[sortItem] - a[sortItem];
          case 'title':
            return a[sortItem].localeCompare(b[sortItem]);
          case 'name':
            return (
              (a.user[sortItem]
                .localeCompare(b.user[sortItem]))
            );
          default: return 0;
        }
      }),
    }));
  }

  render() {
    return (
      <main>
        {this.state.isLoaded ? (
          <table className="table table-sm table-dark">
            <thead>
              <tr>
                <th onClick={() => this.sortData('completed')}>
                  Completed
                </th>
                <th onClick={() => this.sortData('title')}>
                  Title Post
                </th>
                <th onClick={() => this.sortData('name')}>
                  Name user
                </th>
              </tr>
            </thead>
            {this.state.todos.map(todo => (<TodoItem key={todo.id} todo={todo} />))}
          </table>
        ) : (
            <button onClick={this.handleClick} className="btn-load">
              {this.state.isLoading ? 'Loading...' : 'Load'}
            </button>
          )}
      </main>

    );
  }
}

export default TodoList;

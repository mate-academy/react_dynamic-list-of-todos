import React from 'react';
import TodoItem from './TodoItem';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: false,
      loaded: false,
      todos: null,
      users: null
    };

    this.loadTodos = this.loadTodos.bind(this);
    this.sortTodos = this.sortTodos.bind(this);
  }

  loadTodos() {
    this.setState ({
      request: true
    })
  }

  sortTodos(str) {
    this.str =  str;
    this.setState((state) => ({
      todos: state.todos.sort((a, b) => a[this.str].toString().localeCompare(b[this.str].toString()))
    }))
  }

  componentDidMount() {
    const xhrTodos = new XMLHttpRequest();
    const xhrUsers = new XMLHttpRequest();
    xhrTodos.open('GET', 'https://jsonplaceholder.typicode.com/todos');
    xhrUsers.open('GET', 'https://jsonplaceholder.typicode.com/users');
    xhrTodos.addEventListener('load', () => {
      const parsedTodos = JSON.parse(xhrTodos.response);
      xhrUsers.addEventListener('load', () => {
        const parsedUsers = JSON.parse(xhrUsers.response);
        this.setState({
          loaded: true,
          todos: parsedTodos,
          users: parsedUsers
        })
      })
      xhrUsers.send();
    })
    xhrTodos.send();
    }

  render() {
    if (!this.state.request) {
      return <div className="button">
        <button onClick={this.loadTodos}>Download</button>
      </div>
    } else if (this.state.loaded) {
      return (
      <table>
        <thead>
          <tr>
            <th title="click to sort" onClick={this.sortTodos.bind(this, 'title')}>Todos</th>
            <th title="click to sort" onClick={this.sortTodos.bind(this, 'userId')}>Name</th>
            <th title="click to sort" onClick={this.sortTodos.bind(this, 'completed')}>Completed</th>
          </tr>
        </thead>
        <tbody>
          {this.state.todos.map(todo => (
            <TodoItem
              title={todo.title}
              completed={todo.completed}
              users={this.state.users}
              key={todo.title}
              id={todo.userId}
              />
          ))}
        </tbody>
      </table>
      )
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default TodoList;

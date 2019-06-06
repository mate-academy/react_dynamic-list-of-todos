import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requested: false,
      loaded: false,
      data: [],
    }
    this.loadItems = this.loadItems.bind(this);
    this.sortItems = this.sortItems.bind(this);
  }

  loadApi(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => data);
  }

  loadItems() {
    this.setState({
      requested: true
    });

    Promise.all([
      this.loadApi('https://jsonplaceholder.typicode.com/todos'),
      this.loadApi('https://jsonplaceholder.typicode.com/users'),
    ])
    .then(([todos, users]) => this.setState({
      loaded: true,
      data: todos.map((item) => ({
        ...item,
        user: users.find(user => item.userId === user.id)
      }))
    }))
  }

  sortItems(event) {
    const field = event.target.closest('th').dataset.field;

    this.setState((state) => ({
      data: state.data.sort((a, b) => {
        switch (field) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'completed':
            return a.completed.toString().localeCompare(b.completed.toString());
          case 'name':
            return a.user.name.localeCompare(b.user.name);
          default:
            return event.target;
        }
      })
    }))
  }

  render() {
    if (!this.state.requested) {
      return <button onClick={this.loadItems}>Load</button>;
    } else if (this.state.loaded) {
      return (
        <div className="todos-list">
          <table>
            <tbody>
              <tr onClick={this.sortItems}>
                <th data-field="title">Title</th>
                <th data-field="name">User name</th>
                <th data-field="completed">Completed</th>
              </tr>
              {this.state.data.map(item => <TodoItem key={item.title} data={item} />)}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <button>Loading...</button>
    }
  }
}

export default TodoList;

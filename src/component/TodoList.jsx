import React, { Component } from 'react';
import TodoItem from './TodoItem';
import User from './User';
import './TodoList.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.todos,
      users: this.props.users,
      sortBy: 'time'
    };
    this.sort = this.sort.bind(this);
  }

  sort(e) {
    let sortedArr
    switch (e.target.dataset.sortType) {
      case 'title':
        sortedArr = this.state.todos.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        this.setState(() => ({
          todos: sortedArr
        }));
        break;
      case 'status':
        sortedArr = this.state.todos.sort((a, b) => {
          return `${a.completed}`.localeCompare(`${b.completed}`);
        });
        this.setState(() => ({
          todos: sortedArr
        }));
        break;
      case 'name':
        const users = this.state.users;
        sortedArr = this.state.todos.sort((a, b) => {
          return users[a.userId].name.localeCompare(users[b.userId].name);
        });
        this.setState(() => ({
          todos: sortedArr
        }));
        break;
      default: return;
    }
  }

  render() {
    return (
      <div className="todo-list">
        <div className="sort-panel">
          Sort to:
          <button data-sort-type="title" onClick={this.sort}>Title</button>
          <button data-sort-type="status" onClick={this.sort}>status</button>
          <button data-sort-type="name" onClick={this.sort}>Name</button>
        </div>
        {this.props.todos.map(item =>
          <TodoItem key={item.id} title={item.title} completed={item.completed}>
            <User
              name={this.state.users[item.userId].name}
              username={this.state.users[item.userId].username}
              email={this.state.users[item.userId].email} />
          </TodoItem>)}
      </div>
    );
  }
}

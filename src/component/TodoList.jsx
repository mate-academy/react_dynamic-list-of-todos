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
    }
    this.sort = this.sort.bind(this);
  }

  sort(e) {
    console.log(this.state.users)
    if (e.target.dataset.sortType === 'title') {
      const sortedArr = this.state.todos.sort((a, b) =>
        a.title.localeCompare(b.title));
      this.setState(() => ({
        todos: sortedArr
      }));
    };

    if (e.target.dataset.sortType === 'status') {
      const sortedArr = this.state.todos.sort((a, b) => {
        if (a.completed > b.completed) {
          return 1;
        }
        if (a.completed < b.completed) {
          return -1;
        }
        return 0;
      });
      this.setState(() => ({
        todos: sortedArr
      }));
    }

    if (e.target.dataset.sortType === 'name') {
      const sortedArr = this.state.todos.sort((a, b) => {
        if (this.state.users[a.userId].name > this.state.users[b.userId].name) {
          return 1;
        }
        if (this.state.users[a.userId].name < this.state.users[b.userId].name) {
          return -1;
        }
        return 0;
      })
      this.setState(() => ({
        todos: sortedArr
      }));
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
    )
  }
}

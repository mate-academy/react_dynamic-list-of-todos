import React, { Component } from 'react';
import './TodoItem.css';

export default class TodoItem extends Component {
  render() {
    return (
      <div className="todo-item">
        <span className="todo-title">{this.props.title}</span>
        <span>{this.props.completed ? 'completed' : 'todo'}</span>
        {this.props.children}
      </div>
    )
  }
}

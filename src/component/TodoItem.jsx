import React, { Component } from 'react';
import './TodoItem.css';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="todo-item">
        <span className="todo-title">{this.props.title}</span>
        <span>{`${this.props.completed}`}</span>
        {this.props.children}
      </div>
    )
  }
}

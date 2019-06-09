import React, { Component } from 'react';
import User from './User';
import './TodoItem.css';

export default class TodoItem extends Component {
  render() {
    const { title, completed } = this.props.info;

    return (
      <div className='todo-item'>
        <p className='todo-list__title'>Title: {title}</p>
        <p className='todo-list__status'>
          Status: {completed}
        </p>
        <User info={this.props.user}/>
      </div>
    );
  }
}

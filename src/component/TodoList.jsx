import React, { Component } from 'react';
import TodoItem from './TodoItem';
import User from './User';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="todo-list">
        {this.props.todos.map(item =>  
          <TodoItem key={item.id} title={item.title} completed={item.completed}>
            <User 
              name={this.props.users[item.userId].name}
              username={this.props.users[item.userId].username}
              email={this.props.users[item.userId].email} />
          </TodoItem>)}
      </div>
    )
  }
}

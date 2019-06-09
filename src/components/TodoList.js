import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  render() {
    const usersMap = this.props.users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});
    const todosWithUsers = this.props.todos.map(todo => ({ ...todo, user: usersMap[todo.userId] }));
    
    const todoItems = todosWithUsers.map(todo => {
      return <TodoItem
          info={todo}
          user={todo.user}
        />
    });
    return todoItems;
  }
}

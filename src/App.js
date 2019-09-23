import React, { Component } from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';
import getTodosWithUsers from './dataMappers';

class App extends Component {
  state = {
    todosWithUsers: getTodosWithUsers(todos, users),
  }

  render() {
    const { todosWithUsers } = this.state;

    return (
      <TodoList todos={todosWithUsers} />
    );
  }
}

export default App;

import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import TodoList from './components/TodoList/TodoList';
import getTodosWithUsers from './dataMappers';

function App() {
  const todosWithUsers = getTodosWithUsers(todos, users);

  return (
    <TodoList todos={todosWithUsers} />
  );
}

export default App;

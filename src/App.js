import React from 'react';
import './App.css';
import { getUsers, getTodos } from './ArrsApi';

import TodoList from './TodoList';

const App = () => {
  const TodosUsers = async() => {
    const [todos, users] = await Promise.all([getTodos(), getUsers()]);

    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <TodoList getTodosArr={TodosUsers} />
    </div>
  );
};

export default App;

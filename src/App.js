import React from 'react';
import './App.css';

import { todos } from './api/todos';
import { users } from './api/users';

import TodoList from './TodoList';

const App = () => {
  const getTodos = async() => {
    const todosData = await todos();

    return todosData;
  };

  const getUser = async() => {
    const usersData = await users();

    return usersData;
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      <TodoList
        getTodos={getTodos}
        getUsers={getUser}
      />
    </div>
  );
};

export default App;

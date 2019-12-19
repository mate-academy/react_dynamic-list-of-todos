import React, { useState } from 'react';
import './App.css';
import { getTodos, getUsers } from './api';
import TodoList from './Components/TodoList';

const App = () => {
  const [preparedTodos, setTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const loadTodosAndUsers = () => {
    setLoading(true);

    getTodos().then((todos) => {
      getUsers().then((users) => {
        setTodos(todos.map(todo => ({
          ...todo,
          user: users.find(user => user.id === todo.userId),
        })));
        setLoading(false);
      });
    });
  };

  if (isLoading) {
    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {preparedTodos.length === 0 ? (
        <button
          type="button"
          onClick={loadTodosAndUsers}
        >
          Load
        </button>
      ) : (
        <TodoList
          todos={preparedTodos}
        />
      )}
    </div>
  );
};

export default App;

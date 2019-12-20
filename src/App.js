import React, { useState } from 'react';
import './App.css';
import { getTodos, getUsers } from './api';
import TodoList from './Components/TodoList';

const App = () => {
  const [preparedTodos, setPreparedTodos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const loadTodosAndUsers = async() => {
    setLoading(true);

    try {
      const [todos, users] = await Promise.all([getTodos(), getUsers()]);

      setPreparedTodos(todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Dynamic list of todos</h1>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (preparedTodos.length === 0 ? (
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
      ))}
    </div>
  );
};

export default App;

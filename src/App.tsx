import React, { useState, useEffect } from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';
import { getTodos, getUsers } from './Api/Api';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [preparedTodos, setPreparedTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const usersPropmise = getUsers();

    usersPropmise
      .then(result => {
        return setUsers(result);
      });

    const todosPropmise = getTodos();

    todosPropmise
      .then(result => {
        return setTodos(result);
      });
  }, []);

  const loadTodos = () => {
    setIsLoading(true);

    setTimeout(() => {
      const bufferTodos = todos.map(todo => {
        const targetUser = users.find(user => user.id === todo.userId) as User;

        return {
          ...todo,
          userName: targetUser.name,
        };
      });

      setPreparedTodos(bufferTodos);
    }, 1000);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <p>
        <span>Delay of showing is set to 1 second</span>
      </p>
      {preparedTodos.length === 0 && (
        <button type="button" onClick={loadTodos} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      )}
      <TodoList todos={preparedTodos} />
    </div>
  );
};

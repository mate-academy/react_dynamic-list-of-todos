import React, { useState, FC } from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';
import { getTodos, getUsers } from './Api/Api';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTodos = async () => {
    setIsLoading(true);
    const [todosLoaded, users] = await Promise.all([getTodos(), getUsers()]);

    const todosWithUsers = todosLoaded.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })) as Todo[];

    setTodos(todosWithUsers);
  };

  const sortByTitle = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByStatus = () => {
    setTodos([...todos].sort((a, b) => Number(a.completed) - Number(b.completed)));
  };

  const sortByUserName = () => {
    setTodos([...todos].sort((a, b) => a.user.name.localeCompare(b.user.name)));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      {!todos.length && (
        <button type="button" onClick={loadTodos} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Todos'}
        </button>
      )}
      {!!todos.length && (
        <>
          <button type="button" onClick={sortByTitle}>
            Sort by title
          </button>
          <button type="button" onClick={sortByStatus}>
          Sort by Status
          </button>
          <button type="button" onClick={sortByUserName}>
          Sort by UserName
          </button>
        </>
      )}
      <TodoList todos={todos} />
    </div>
  );
};

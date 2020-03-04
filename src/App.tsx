import React, { FC, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos, getUsers } from './api';

export const App: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [todos, setTodos] = useState<TodoWithUser[]>([]);

  const loadTodos = async () => {
    setLoading(true);

    const [todosLoaded, users] = await Promise.all([getTodos(), getUsers()]);

    const todosWithUsers = todosLoaded.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUsers);
  };

  const sortById = () => {
    setTodos([...todos].sort((a, b) => a.id - b.id));
  };

  const sortByTitle = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByName = () => {
    setTodos([...todos].sort((a, b) => {
      if (a.user && b.user) {
        return a.user.name.localeCompare(b.user.name);
      }

      return 0;
    }));
  };

  const sortByStatus = () => {
    setTodos([...todos].sort((a, b) => Number(b.completed) - Number(a.completed)));
  };

  if (todos.length === 0) {
    return (
      <>
        <button
          type="button"
          className="app__load-btn"
          onClick={loadTodos}
          disabled={isLoading}
        >
          Load
        </button>
        {isLoading && (
          <p className="app__loading-text">Loading...</p>
        )}
      </>
    );
  }

  return (
    <TodoList
      todos={todos}
      onSortId={sortById}
      onSortTask={sortByTitle}
      onSortName={sortByName}
      onSortStatus={sortByStatus}
    />
  );
};

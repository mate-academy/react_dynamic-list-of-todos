import React, { useState, FC } from 'react';
import './App.css';
import { TodosList } from './components/TodosList/TodosList';
import { getUsers, getTodos } from './api';

const App: FC = () => {
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

  const sortByTitle = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const sortByName = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setTodos([...todos].sort((a, b) => a.user!.name.localeCompare(b.user!.name)));
  };

  const sortByStatus = () => {
    setTodos([...todos].sort((a, b) => Number(b.completed) - Number(a.completed)));
  };

  if (todos.length === 0) {
    return (
      <>
        <button
          type="button"
          className="btn-load"
          onClick={loadTodos}
          disabled={isLoading}
        >
          Load
        </button>
        {isLoading && (
          <p className="text">Loading...</p>
        )}

      </>
    );
  }

  return (
    <TodosList
      todos={todos}
      onSortTask={sortByTitle}
      onSortName={sortByName}
      onSortStatus={sortByStatus}
    />
  );
};

export default App;

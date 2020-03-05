import React, { FC, useState } from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { getTodos, getUsers } from './api';

export const App: FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [filterUsed, setFilterUsed] = useState(true);
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [sortedTodos, setSortedTodos] = useState<TodoWithUser[]>([...todos]);

  const loadTodos = async () => {
    setLoading(true);

    const [loadedTodos, loadedUsers] = await Promise.all([
      getTodos(),
      getUsers(),
    ]);

    const todosWithUsers = loadedTodos.map(todo => ({
      ...todo,
      user: loadedUsers.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUsers);
    setSortedTodos(todosWithUsers);
    setLoading(false);
  };

  const sortFilter = (option: string) => {
    if (filterUsed) {
      switch (option) {
        case 'task': setSortedTodos([...todos]
          .sort((a, b) => b.title.localeCompare(a.title)));
          break;
        case 'status': setSortedTodos([...todos]
          .sort((a, b) => Number(b.completed) - Number(a.completed)));
          break;
        default: setSortedTodos([...todos]
          .sort((a, b) => ((a.user && b.user) ? b.user.name.localeCompare(a.user.name) : 0)));
      }

      setFilterUsed(false);
    } else {
      setSortedTodos(sortedTodos.reverse());
      setFilterUsed(true);
    }
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
      todos={sortedTodos}
      onSort={sortFilter}
    />
  );
};

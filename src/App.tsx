import React, { FC, useState } from 'react';
import './App.css';
import { getTodos } from './api';
import { PreparedTodos } from './interfaces';
import { TodoList } from './TodoList';

const App: FC = () => {
  const [todos, setTodos] = useState<PreparedTodos[]>([]);
  const [isLoading, setLoading] = useState(false);

  const prepared = async () => {
    setLoading(true);
    const fetchedTodos = await getTodos();

    setTodos(fetchedTodos);
  };

  const sortedByName = () => (
    setTodos(prevTodos => [...prevTodos].sort(
      (todoA, todoB) => todoA.user.name.localeCompare(todoB.user.name),
    ))
  );

  const sortedByTitle = () => (
    setTodos(prevTodos => [...prevTodos].sort(
      (todoA, todoB) => todoA.title.localeCompare(todoB.title),
    ))
  );

  const sortedByCompleted = () => (
    setTodos(prevTodos => [...prevTodos].sort(
      (todoA, todoB) => Number(todoA.completed) - Number(todoB.completed),
    ))
  );

  return (
    <>
      <h1>List of todos</h1>
      {!todos.length
        ? (
          <button
            type="button"
            onClick={prepared}
            disabled={isLoading}
          >
            {isLoading ? 'Loading' : 'Click for download'}
          </button>
        )
        : (
          <>
            <button type="button" onClick={sortedByName}>Sort by user name</button>
            <button type="button" onClick={sortedByTitle}>Sort by title</button>
            <button type="button" onClick={sortedByCompleted}>Sorted by completed</button>
            <TodoList todos={todos} />
          </>
        )}
    </>
  );
};

export default App;

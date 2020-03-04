import React, { FC, useState } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { TodoList } from './Components/TodoList/TodoList';
import { TodoWithUser } from './constants/types';
import { getTodosWithUser } from './utils/api';

export const App: FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleStart = async () => {
    setIsLoaded(true);
    const filteredTodos = await getTodosWithUser();

    setTodos(filteredTodos);
    setIsLoaded(false);
  };

  return (
    <div className="app">
      <h1 className="title">Dynamic list of TODOs</h1>
      {!todos.length
        ? (
          <button
            className="button"
            type="button"
            onClick={handleStart}
          >
            {isLoaded ? 'Loading.......' : 'Start load'}
          </button>
        )

        : (
          <TodoList
            todos={todos}
          />
        )}
    </div>
  );
};

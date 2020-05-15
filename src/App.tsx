import React, { useState } from 'react';
import './App.css';
import { getTodos } from './api/api';
import { TodoList } from './Todolist';
import { Buttons } from './Buttons';

const App = () => {
  const [todosList, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const loadTodos = () => {
    setIsLoading(!isLoading);
    setIsVisible(!isVisible);
    setTimeout(() => {
      getTodos()
        .then((data) => setTodos(data))
        .finally(() => {
          setIsLoading(false);
        });
    },
    1000);
  };

  const sortByFilter = (filter: string) => {
    setTodos([...todosList]
      .sort((a, b) => a[filter].localeCompare(b[filter])));
  };

  const sortByCompleted = () => {
    setTodos([...todosList]
      .sort((a: Todo, b: Todo) => +a.completed - +b.completed));
  };

  return (
    <div className="container">
      <h1>Dynamic list of TODOs</h1>
      {!isVisible
          && (
            <button
              type="button"
              className="button"
              onClick={loadTodos}
            >
              Load Todos
            </button>
          )}
      {isLoading
        ? <div className="loader" />
        : (isVisible
          && (
            <>
              <Buttons
                sortByFilter={sortByFilter}
                sortByCompleted={sortByCompleted}
              />
              <TodoList todos={todosList} />
            </>
          )
        )}

    </div>
  );
};

export default App;

import React, { useState, MouseEvent } from 'react';
import './App.css';
import { getTodos } from './api/api';
import { TodoList } from './Todolist';
import { Buttons } from './Buttons';

const App = () => {
  const [todosList, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const loadTodos = () => {
    setIsLoading(true);
    setIsVisible(true);
    getTodos()
      .then((data) => setTodos(data))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const sortByColumn = (event: MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;

    switch (name) {
      case 'title':
      case 'user':
        setTodos([...todosList]
          .sort((a, b) => a[name].localeCompare(b[name])));
        break;
      case 'completed':
        setTodos([...todosList]
          .sort((a: Todo, b: Todo) => +a.completed - +b.completed));
        break;
      default:
        break;
    }
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
                sortByFilter={sortByColumn}
              />
              <TodoList todos={todosList} />
            </>
          )
        )}

    </div>
  );
};

export default App;

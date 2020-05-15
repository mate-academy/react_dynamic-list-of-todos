import React, { useState } from 'react';
import './App.css';
import { getTodos } from './api/api';
import { TodoList } from './Todolist';

const App = () => {
  const [todosList, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [sortField, setSortField] = useState<string>('');

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

  switch (sortField) {
    case 'completed':
      getTodos()
        .then((todosFromServer) => setTodos(todosFromServer
          .sort((a: Todo, b: Todo) => +a.completed - +b.completed)));
      break;
    case 'user':
    case 'title':
      getTodos()
        .then(todosFromServer => setTodos(todosFromServer
          .sort((a: Todo, b: Todo) => a[sortField].localeCompare(b[sortField]))));
      break;
    default:
      break;
  }

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
              <div className="buttons">
                <button
                  className="button"
                  type="button"
                  onClick={() => setSortField('user')}
                >
                  Sort by Name
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => setSortField('title')}
                >
                  Sort by Title
                </button>
                <button
                  className="button"
                  type="button"
                  onClick={() => setSortField('completed')}
                >
                  Sort by Completed
                </button>
              </div>
              <TodoList todos={todosList} />
            </>
          )
        )}

    </div>
  );
};

export default App;

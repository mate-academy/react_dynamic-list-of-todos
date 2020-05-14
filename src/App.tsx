import React, { useState } from 'react';
import './App.css';
import { getTodos } from './api/api';
import { TodoList } from './Todolist';

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
    500);
  };

  const sortByName = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setTodos([...todosList].sort((a: Todo, b: Todo) => a.user.localeCompare(b.user)));
      setIsLoading(false);
    },
    500);
  };

  const sortByTitle = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setTodos([...todosList].sort((a: Todo, b: Todo) => a.title.localeCompare(b.title)));
      setIsLoading(false);
    },
    500);
  };

  const sortByCompleted = () => {
    setIsLoading(!isLoading);
    setTimeout(() => {
      setTodos([...todosList].sort((a: Todo, b: Todo) => +a.completed - +b.completed));
      setIsLoading(false);
    },
    500);
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {
        isVisible
          ? (
            <div className="buttons">
              <button type="button" onClick={sortByName}>Sort by Name</button>
              <button type="button" onClick={sortByTitle}>Sort by Title</button>
              <button type="button" onClick={sortByCompleted}>Sort by Completed</button>
            </div>
          )
          : <button type="button" className="todo__button" onClick={loadTodos}>Load Todos</button>
      }
      {isLoading
        ? <div className="loader" />
        : (
          <div className="container">
            <TodoList todos={todosList} />
          </div>
        )}

    </>
  );
};

export default App;

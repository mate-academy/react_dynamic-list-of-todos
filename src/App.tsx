import React, { useState } from 'react';
import './App.css';

import { getPrepareTodos } from './helpers/api';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ApdateTodo[]>([]);
  const [initialTodos, setInitialTodos] = useState<ApdateTodo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadTodos = () => {
    setIsLoaded(!isLoaded);

    getPrepareTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setIsLoading(true);
        setInitialTodos(todosFromServer);
        setTodos(todosFromServer);
      });
  };

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadTodos();
    }, 1000);
  };

  const sortByTodosName = () => {
    setTodos([...initialTodos].sort((todoPrev, todoCurr) => (
      (todoPrev.title).localeCompare(todoCurr.title))));
  };

  const sortByCompleted = () => {
    setTodos([...initialTodos].sort((todoPrev, todoCurr) => (
      (+todoPrev.completed) - (+todoCurr.completed))));
  };

  const sortByUserName = () => {
    setTodos([...initialTodos].sort((todoPrev, todoCurr) => (
      (todoPrev.user.name).localeCompare(todoCurr.user.name))));
  };

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {!isLoaded ? (
        <button type="button" onClick={handleLoading}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <table className="App">
          <thead>
            <tr>
              <th><a href="#/Todos" onClick={sortByTodosName}>Todos</a></th>
              <th><a href="#/Completed" onClick={sortByCompleted}>Is completed</a></th>
              <th><a href="#/Users" onClick={sortByUserName}>Users</a></th>
            </tr>
          </thead>
          <tbody>
            <TodoList todos={todos} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default App;

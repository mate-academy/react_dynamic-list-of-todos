import React, { useState } from 'react';
import './App.css';

import { getPrepareTodos } from './helpers/api';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ApdateTodo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadTodos = () => {
    setIsLoaded(!isLoaded);

    getPrepareTodos()
      .then(todosFromServe => {
        setTodos(todosFromServe);
        setIsLoading(true);
      });
  };

  const handleLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadTodos();
    }, 1000);
  };

  const sortByTodosName = () => {
    const sortedTodos = [...todos].sort((todoPrew, todoCurr) => (
      (todoPrew.title).localeCompare(todoCurr.title)
    ));

    setTodos(sortedTodos);
  };

  const sortByCompleted = () => {
    const sortedTodos = [...todos].sort((todoPrew, todoCurr) => (
      (+todoPrew.completed) - (+todoCurr.completed)
    ));

    setTodos(sortedTodos);
  };

  const sortByUserName = () => {
    const sortedTodos = [...todos].sort((todoPrew, todoCurr) => (
      (todoPrew.user.name).localeCompare(todoCurr.user.name)
    ));

    setTodos(sortedTodos);
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

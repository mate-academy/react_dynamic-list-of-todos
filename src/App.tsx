import React, { useState } from 'react';
import './App.css';

import { getTodos } from './api/api';
import { TodosList } from './components/TodosList';
import { Buttons } from './components/Buttons';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleSortButtons, setVisibleSortButtons] = useState<boolean>(false);

  const handleGetTodos = () => {
    setLoading(true);
    setVisibleSortButtons(true);
    setTimeout(() => {
      getTodos()
        .then(todosFromServer => setTodos(todosFromServer))
        .finally(() => {
          setLoading(false);
        });
    }, 1000);
  };

  const handleSortTitle = () => {
    setTodos([...todos].sort((a, b) => a.title.localeCompare(b.title)));
  };

  const handleSortCompleted = () => {
    setTodos([...todos].sort((a, b) => +a.completed - +b.completed));
  };

  const handleSortUser = () => {
    setTodos([...todos].sort((a, b) => a.userCatalog.name.localeCompare(b.userCatalog.name)));
  };

  const buttonsInit: Button[] = [
    { id: 1, title: 'Sort by title', event: handleSortTitle },
    { id: 2, title: 'Sort by complete', event: handleSortCompleted },
    { id: 3, title: 'Sort by user', event: handleSortUser },
  ];

  return (
    <>
      <h1>Dynamic list of TODOs</h1>
      {
        visibleSortButtons
          ? <Buttons buttonsInit={buttonsInit} />
          : <button type="button" className="todo__button" onClick={handleGetTodos}>Load Todos</button>
      }
      {
        loading
          ? (
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          )
          : <TodosList todos={todos} />
      }
    </>
  );
};

export default App;

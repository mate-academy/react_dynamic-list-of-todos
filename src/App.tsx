import React, { useState } from 'react';
import TodosList from './TodosList';
import './App.css';
import { promise } from './API';

const App = () => {
  const [todos, setTodos] = useState<TodosWithUsers[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [upAlphabetName, setUpAlphabetName] = useState<boolean>(false);
  const [upAlphabetTitle, setUpAlphabetTitle] = useState<boolean>(false);
  const [isCompletedTodo, setIsCompletedTodo] = useState<boolean>(false)

  const fetchData = (): void => {
    setLoading(true);
    promise.then(data => {
      setLoading(false);

      return setTodos(data);
    });
  };

  const nameFilter = () => {
    let newTodos = [];

    if (!upAlphabetName) {
      newTodos = todos.sort((a, b) => a.user.name.localeCompare(b.user.name));
      setUpAlphabetName(true);

      return setTodos([...newTodos]);
    }

    newTodos = todos.sort((a, b) => b.user.name.localeCompare(a.user.name));
    setUpAlphabetName(false);

    return setTodos([...newTodos]);
  };

  const titleFilter = () => {
    let newTodos = [];

    if (!upAlphabetTitle) {
      newTodos = todos.sort((a, b) => a.title.localeCompare(b.title));
      setUpAlphabetTitle(true);

      return setTodos([...newTodos]);
    }

    newTodos = todos.sort((a, b) => b.title.localeCompare(a.title));
    setUpAlphabetTitle(false);

    return setTodos([...newTodos]);
  };

  const completedFilter = () => {
    let newTodos = [];

    if (!isCompletedTodo) {
      newTodos = todos.sort((a, b) => Number(a.completed) - Number(b.completed));
      setIsCompletedTodo(true);

      return setTodos([...newTodos]);
    }

    newTodos = todos.sort((a, b) => Number(b.completed) - Number(a.completed));
    setIsCompletedTodo(false);

    return setTodos([...newTodos]);
  };

  return (
    <div className="app">
      <h1 className="app__header">Dynamic list of TODOs</h1>
      {todos.length > 0 && (
        <div className="app__button-filter">
          <button
            type="button"
            onClick={nameFilter}
            className="app__button"
          >
            Filter by name
          </button>
          <button
            type="button"
            onClick={titleFilter}
            className="app__button"
          >
            Filter by title
          </button>
          <button
            type="button"
            onClick={completedFilter}
            className="app__button"
          >
            Filter by complete
          </button>
        </div>
      )}
      <TodosList todos={todos} />
      {todos.length === 0
      && (
        <button
          type="button"
          onClick={fetchData}
          className="app__button"
        >
          {isLoading ? 'Loading...' : 'Get Todo'}
        </button>
      )}
    </div>
  );
};

export default App;

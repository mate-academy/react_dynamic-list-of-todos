import React, { useState } from 'react';
import './App.css';

import { getUsers, getTodos, Todo } from './helpers/api';
import { TodoList } from './components/TodoList';
import { SortButtons } from './components/SortButtons';

const App = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState(0);

  const handleLoadClick = async () => {
    setIsLoading(true);

    const todosFromServer = await getTodos();
    const usersFromServer = await getUsers();

    const todosWithUsers = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setInitialTodos(todosWithUsers);
  };

  const reset = () => {
    setSortBy(0);
  };

  const sortByUserName = () => {
    setSortBy(1);
  };

  const sortByTitle = () => {
    setSortBy(2);
  };

  const sortByCompleted = () => {
    setSortBy(3);
  };

  const todos = [...initialTodos].sort((a, b) => {
    if (a.user === undefined || b.user === undefined) {
      return 0;
    }

    switch (sortBy) {
      case 1:
        return a.user.name.localeCompare(b.user.name);

      case 2:
        return a.title.localeCompare(b.title);

      case 3:
        return Number(b.completed) - Number(a.completed);

      default:
        return 0;
    }
  });

  return (
    <div className="container">
      <h1 className="header">Dynamic list of TODOs</h1>
      {todos.length === 0 ? (
        <button className="button" type="button" onClick={handleLoadClick}>
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <SortButtons
            reset={reset}
            sortByTitle={sortByTitle}
            sortByCompleted={sortByCompleted}
            sortByUserName={sortByUserName}
          />
          <TodoList todos={todos} />
        </>
      )}
    </div>
  );
};

export default App;

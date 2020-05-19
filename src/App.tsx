import React, { useState } from 'react';
import { TodosList } from './Components/TodosList/TodosList';
import {
  getUsers, getTodos, Todo,
} from './Helpers/api';

import './App.css';

const App: React.FC = () => {
  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const startLoadingFromServer = async () => {
    setLoading(true);

    try {
      const todosFromServer = await getTodos();
      const usersFromServer = await getUsers();

      const preparedTodos = todosFromServer.map(todo => ({
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      }));

      setInitialTodos(preparedTodos);
      setTodos(preparedTodos);
      setIsLoaded(true);
    } catch (error) {
      setIsError(true);
    }
  };

  const reset = () => {
    setTodos(initialTodos);
  };

  const handleSortByName = () => {
    const sortedNames = [...initialTodos].sort((a, b) => {
      return a.user && b.user
        ? a.user.name.localeCompare(b.user.name)
        : 0;
    });

    setTodos(sortedNames);
  };

  const handleSortByTitle = () => {
    const sortedTitles = [...initialTodos].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    setTodos(sortedTitles);
  };

  const handleSortByCompletion = () => {
    const sortedCompleted = [...initialTodos].sort((a) => (a.completed ? 1 : -1));

    setTodos(sortedCompleted);
  };

  return (
    <div className="App">
      {!isLoaded ? (
        <>
          <button type="button" onClick={startLoadingFromServer} disabled={loading}>
            <span>{!loading ? 'Load' : 'Loading...'}</span>
          </button>
          <p>{isError && 'Please reload the page'}</p>
        </>
      ) : (
          (todos.length > 0)
          && (
            <>
              <div className="buttons__list">
                <button type="button" onClick={reset}>
                  <span>reset</span>
                </button>
                <button type="button" onClick={handleSortByName}>
                  <span>sort by name</span>
                </button>
                <button type="button" onClick={handleSortByTitle}>
                  <span>sort by title</span>
                </button>
                <button type="button" onClick={handleSortByCompletion}>
                  <span>sort by completion</span>
                </button>
              </div>

              <TodosList todos={todos} />
            </>
          )
        )}
    </div>
  );
};

export default App;

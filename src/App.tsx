import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState<null | number>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<null | string>(null);

  const clearUser = useCallback(() => {
    setSelectedUserId(null);
  }, []);

  useEffect(() => {
    const receiveTodosPromise = getTodosFromServer();

    receiveTodosPromise
      .then((receiveTodos) => {
        setTodos(receiveTodos);
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setTodos([]);
      });
  });

  useEffect(() => {
    setTodos([]);
  }, []);

  return (
    <div className="App">
      {error ? (
        <h1 className="App__error">{error}</h1>
      ) : (
        <>
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              setSelectedUserId={setSelectedUserId}
            />
          </div>
          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearUser={clearUser}
                />
              ) : 'No user selected'}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

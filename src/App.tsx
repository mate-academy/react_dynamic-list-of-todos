import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setIsLoaded(true))
      .catch(() => setHasError(true));
  }, []);

  return (
    <div className="App">
      {hasError
        ? (
          <div className="App__sidebar">
            <p className="App__error-text">
              The network connection with the server has been lost!
              <br />
              Please try again...
              <br />
              Press &quot;F5&quot; on your keyboard to reload the page!
            </p>
          </div>
        )
        : (
          <>
            <div className="App__sidebar">
              {isLoaded
                ? (
                  <TodoList
                    todos={todos}
                    selectUser={setSelectedUserId}
                    selectedUserId={selectedUserId}
                  />
                )
                : (
                  <p className="App__error-text">
                    Loading...
                  </p>
                )}
            </div>

            <div className="App__content">
              <div className="App__content-container">
                {selectedUserId
                  ? (
                    <CurrentUser
                      userId={selectedUserId}
                      clearUser={setSelectedUserId}
                    />
                  )
                  : (
                    <p className="App__error-text">
                      No user selected
                    </p>
                  )}
              </div>
            </div>
          </>
        )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<boolean>(false);

  const loading = () => {
    setIsLoading(true);
  };

  const getServerError = () => {
    setServerError(true);
  };

  useEffect(() => {
    getTodos().then(async response => {
      if (response.ok) {
        setTodos(await response.json());
      } else {
        setServerError(true);
      }
    })
      .then(loading)
      .catch(getServerError);
  }, []);

  return (
    <div className="App">
      {serverError ? (
        <p>Server Error</p>
      ) : (
        <>
          {isLoading ? (
            <>
              <div className="App__sidebar">
                <TodoList
                  todos={todos}
                  selectUserId={setSelectedUserId}
                />
              </div>

              <div className="App__content">
                <div className="App__content-container">
                  {selectedUserId ? (
                    <CurrentUser userId={selectedUserId} selectUserId={setSelectedUserId} />
                  ) : 'No user selected'}
                </div>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
};

export default App;

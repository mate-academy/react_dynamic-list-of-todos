import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './components/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setLoading(true))
      .catch(() => {
        setHasLoadingError(true);
      });
  }, []);

  return (
    <div className="App">
      {hasLoadingError ? (
        <p>Data is not found</p>
      ) : (
        <>
          <div className="App__sidebar">
            {!isLoading ? (
              <p>Loading...</p>
            ) : (
              <TodoList
                todos={todos}
                selectUserId={setSelectedUserId}
              />
            )}

          </div>

          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser
                  userId={selectedUserId}
                  clearId={setSelectedUserId}
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

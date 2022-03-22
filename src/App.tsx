import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .then(() => setLoaded(true))
      .catch(() => setLoadingError(true));
  }, []);

  return (
    <div className="App">
      {loadingError ? (
        <div className="App__sidebar">
          <p>Oops... Page loading error! Try again...</p>
        </div>
      ) : (
        <>
          {loaded ? (
            <div className="App__sidebar">
              <TodoList
                todos={todos}
                selectedUserId={selectedUserId}
                changeUserId={setSelectedUserId}
              />
            </div>
          ) : (
            <div className="App__sidebar">
              <p>Loading...</p>
            </div>
          )}
        </>
      )}

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUsers={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

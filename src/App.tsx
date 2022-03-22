import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { Todo } from './types/Todo';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [progress, setProgress] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todoFromServe => setTodos(todoFromServe))
      .then(() => setProgress(true))
      .catch(() => setLoadingError(true));
  }, []);

  return (
    <>
      {!progress && (
        <p>Loading data...</p>
      )}

      {(loadingError && progress) && (
        <p>Failed loading data</p>
      )}

      {(!loadingError && progress) && (
        <div className="App">
          <div className="App__sidebar">
            <TodoList
              selectedUserId={selectedUserId}
              selectedUser={setSelectedUserId}
              todos={todos}
            />
          </div>

          <div className="App__content">
            <div className="App__content-container">
              {selectedUserId ? (
                <CurrentUser userId={selectedUserId} />
              ) : 'No user selected'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;

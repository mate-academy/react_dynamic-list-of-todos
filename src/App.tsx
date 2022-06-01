import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function response() {
      try {
        const todosFromServer = await getTodos();

        setTodos(todosFromServer);
      } catch {
        setErrorMessage('Cant load todos from server');
      }
    }

    response();
  }, []);

  return (
    <div className="App">
      {!errorMessage ? (
        <div className="App__sidebar">
          {todos ? (
            <TodoList
              todos={todos}
              selectedUserId={selectedUserId}
              onSelectUserId={setSelectedUserId}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      ) : (
        <p>{errorMessage}</p>
      )}

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

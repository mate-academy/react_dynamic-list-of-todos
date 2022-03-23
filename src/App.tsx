import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {hasError ? (
          <div>
            <p>Error loading :(</p>
          </div>
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
            <CurrentUser userId={selectedUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

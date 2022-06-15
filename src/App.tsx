/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const urlTodos = 'https://mate.academy/students-api/todos';

  const [theTodos, setTheTodos] = useState([]);

  useEffect(() => {
    fetch(urlTodos)
      .then(response => response.json())
      .then(todos => {
        setTheTodos(todos);
      });
  }, []);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const selectUser = (selectedId: number) => {
    if (selectedId !== selectedUserId) {
      setSelectedUserId(selectedId);
    }
  };

  const clearUser = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={theTodos}
          onSelect={selectUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              onClear={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

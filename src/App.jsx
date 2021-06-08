import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setUserId] = useState(0);

  const selectUser = (userId) => {
    setUserId(userId);
  };

  useEffect(() => {
    getTodos(todos)
      .then(setTodos);
  }, []);

  const clearUser = () => {
    setUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          selectUser={selectUser}
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
    </div>
  );
};

export default App;

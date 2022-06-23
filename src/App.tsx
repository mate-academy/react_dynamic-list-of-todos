import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/api';
import { CurrentUser } from './components/CurrentUser';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          selectUser={(userId) => setSelectedUserId(userId)}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              clearUser={() => setSelectedUserId(0)}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

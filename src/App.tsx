import React, { useState, useEffect } from 'react';
import { Todo } from './react-app-env';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import './App.scss';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  const onUserIdSelected = (userId: number) => {
    return setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          onUserIdSelected={onUserIdSelected}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onUserIdSelected={onUserIdSelected}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

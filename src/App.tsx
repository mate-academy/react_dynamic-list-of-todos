import React, { useState, useEffect } from 'react';

import './App.scss';
import './styles/general.scss';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
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

export default App;

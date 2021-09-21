import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { loadTodos } from './api/api';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (
      async () => {
        const data = await loadTodos(20);

        return setTodos(data);
      }
    )();
  }, []);

  const handleUserClear = () => {
    setSelectedUserId(0);
  };

  const handleUserSelected = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onUserSelection={handleUserSelected}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onUserClear={handleUserClear}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

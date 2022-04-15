import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);

  const clearUserId = useCallback(
    () => setSelectedUserId(0),
    [],
  );

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectUser={setSelectedUserId}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={clearUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

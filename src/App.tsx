import React, { useState, useCallback, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const getData = useCallback(async () => {
    const data = await getTodos();

    setTodos(data);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const clearUser = useCallback(() => setSelectedUserId(0), []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          setSelectedUserId={setSelectedUserId}
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

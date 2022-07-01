import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { Todo } from './components/Types/Types';

const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = useCallback(async () => {
    setTodos(await getTodos());
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={userId}
          setSelectedUserId={setUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {userId ? (
            <CurrentUser
              selectedUserId={userId}
              setSelectedUserId={setUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

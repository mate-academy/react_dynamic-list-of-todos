import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState<number>(0);

  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodosFromServer = useCallback(async () => {
    const todoFromServer = await getTodos();

    setTodos(todoFromServer);
  }, []);

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const clearUser = useCallback(() => {
    setSelectedUserId(0);
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          setSelectedUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
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

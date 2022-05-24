import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api/api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const getTodos = useCallback(async () => {
    const todosFromServer = await getTodosFromServer();

    setTodos(todosFromServer);
  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onSelect={setSelectedUserId}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onSelect={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useCallback, useEffect } from 'react';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './react-app-env';

import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const removeUser = useCallback(() => {
    setSelectedUserId(null);
  }, []);

  const getTodosList = useCallback(async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  }, []);

  useEffect(() => {
    getTodosList();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectedUser={selectedUserId}
          selectedUserId={setSelectedUserId}
          todos={todos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onRemoveUser={removeUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

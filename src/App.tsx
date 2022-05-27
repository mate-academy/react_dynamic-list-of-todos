import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodosFromServer } from './api/api';
import { Todo } from './types/Todo';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const clearUser = useCallback(() => {
    setSelectedUserId(null);
  }, []);

  const getTodos = useCallback(async () => {
    const todosFromServer = await getTodosFromServer();

    setTodos(todosFromServer);
  }, []);

  const shuffleTodos = useCallback(() => {
    setTodos([...todos].sort(() => Math.random() - 0.5));
  }, [todos]);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          onShuffle={shuffleTodos}
          todos={todos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onClearUser={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

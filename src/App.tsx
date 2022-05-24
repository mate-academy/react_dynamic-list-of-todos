import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './types/todo';
import { getTodos, getUser } from './api';
import { User } from './types/user';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getTodos().then((todosFS) => {
      setTodos(todosFS);
    });
  }, []);

  const selectUser = useCallback((userId: number) => {
    setSelectedUserId(userId);
    getUser(userId).then(userFS => {
      setUser(userFS);
    });
  }, []);

  const clearUser = useCallback(() => {
    setSelectedUserId(0);
    setUser(null);
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          onSelectUser={selectUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId && user ? (
            <CurrentUser
              user={user}
              onClearUser={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

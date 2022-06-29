import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    (async () => {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    })();
  }, []);

  const onUserSelect = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onUserSelect={onUserSelect}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              onSelect={onUserSelect}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

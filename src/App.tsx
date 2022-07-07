import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);
  const [count, setCount] = useState(0);

  const loadTodos = useCallback(
    async () => {
      const loadedTodos = await getTodos();

      setTodos(loadedTodos);
    },
    [],
  );

  useEffect(() => {
    loadTodos();
  }, []);

  const selectHandler = useCallback(
    (userId: number) => {
      setSelectedUserId(userId);
    },
    [selectedUserId],
  );

  return (
    <div className="App">
      <div className="App__sidebar">
        <button
          type="button"
          onClick={() => setCount(state => state + 1)}
        >
          {count}
        </button>
        <TodoList
          todos={todos}
          onSelect={selectHandler}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onSelect={selectHandler}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

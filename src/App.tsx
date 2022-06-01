import React, { useCallback, useEffect, useState } from 'react';
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

  const randomTodos = () => {
    const filterTodos = [...todos];

    for (let i = todos.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));

      [filterTodos[i], filterTodos[j]]
        = [filterTodos[j], filterTodos[i]];
    }

    return filterTodos;
  };

  const shuffleTodos = useCallback(() => {
    setTodos(randomTodos());
  }, [todos]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onSelectedUserId={setSelectedUserId}
          onShuffle={shuffleTodos}
          onDefaulte={getData}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              clearUser={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

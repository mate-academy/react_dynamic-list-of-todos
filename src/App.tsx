import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './helpers/api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);

  const selectedUserChangeHandler = useCallback(
    (newSelectedUserId: number) => setSelectedUserId(newSelectedUserId),
    [],
  );

  const loadTodos = useCallback(
    async () => {
      const todoList = await getTodos();

      setTodos(todoList);
    },
    [],
  );

  useEffect(
    () => {
      loadTodos();
    },
    [],
  );

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          selectedUserChangeHandler={selectedUserChangeHandler}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId
            ? (
              <CurrentUser userId={selectedUserId} />
            )
            : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

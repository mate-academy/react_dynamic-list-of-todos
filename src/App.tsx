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
    onSelect,
  ] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);

  const getAllPosts = useCallback(
    async () => {
      const gotTodos = await getTodos();

      setTodos(gotTodos);
    }, [],
  );

  useEffect(() => {
    getAllPosts();
  }, []);

  const clear = (userId: number) => {
    onSelect(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onSelect={onSelect}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clear={clear}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

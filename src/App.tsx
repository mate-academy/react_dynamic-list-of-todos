import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const isLoadedTodos = await getTodos();

    setTodos(isLoadedTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleSelectedTodos = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          isSelected={handleSelectedTodos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              isSelected={handleSelectedTodos} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

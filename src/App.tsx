import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api/api';
import { Todo } from './types';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [selectedTodos, setSelectedTodos] = useState<Todo[]>([]);

  const showTodos = () => (
    getAllTodos()
      .then(data => (
        setSelectedTodos(data)
      ))
  );

  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  const clearCurrentUser = () => {
    setSelectedUserId(0);
  };

  useEffect(() => {
    showTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={selectedTodos}
          selectUser={selectUser}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={clearCurrentUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

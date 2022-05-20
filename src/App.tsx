import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { ToDo } from './types/types';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todos, setTodos] = useState<ToDo[]>([]);
  const API__URL = 'https://mate.academy/students-api';

  useEffect(() => {
    const getAll = async () => {
      const response = await fetch(`${API__URL}/todos`);
      const respons = await response.json();

      setTodos(respons);
    };

    getAll();
  }, [])

  const clearUser = () => {
    setSelectedUserId(0)
  }

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

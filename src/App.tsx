import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    setTodos(
      await getTodos(),
    );
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          onSelect={(userId: number) => {
            setSelectedUserId(userId);
          }}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              onClear={() => {
                setSelectedUserId(0);
              }}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

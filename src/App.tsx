import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data));
  }, []);

  const selectUser = (userId: number) => {
    if (selectedUserId !== userId) {
      setSelectedUserId(userId);
    }
  };

  const removeUser = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          selectUser={selectUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              removeUser={removeUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

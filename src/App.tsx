import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  }, []);

  const selectUserId = (id: number) => {
    setSelectedUserId(id);
  };

  const clearUser = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectUser={selectUserId}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId
            ? (
              <CurrentUser
                selectedUserId={selectedUserId}
                clearUser={clearUser}
              />
            )
            : <h3>No user selected</h3>}
        </div>
      </div>
    </div>
  );
};

export default App;

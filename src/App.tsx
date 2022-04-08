import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todosList, setTodosList] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(todos => setTodosList(todos));
  }, []);

  const selectUser = (userId: number): void => {
    setSelectedUserId(userId);
  };

  const clearHandler = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todosList}
          selectUser={selectUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <>
              <button
                className="button"
                type="button"
                onClick={clearHandler}
              >
                Clear
              </button>
              <CurrentUser
                selectedUser={selectedUserId}
              />
            </>
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todosUser, setTodosUser] = useState([]);

  useEffect(() => {
    getTodos()
      .then(todos => setTodosUser(todos));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todosUser}
          selectedUserId={(uId) => {
            setSelectedUserId(uId);
          }}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              selectedUserId={(uId) => {
                setSelectedUserId(uId);
              }}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

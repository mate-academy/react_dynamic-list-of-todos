import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos, getAllUsers } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);

  const displayUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    getAllTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  useEffect(() => {
    getAllUsers()
      .then(usersFromServer => {
        setUsers(usersFromServer);
      });
  }, [selectedUserId]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectUser={displayUser}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <>
              <CurrentUser
                users={users}
                selectedUserId={selectedUserId}
              />
              <button
                type="button"
                className="button"
                onClick={() => {
                  setSelectedUserId(0);
                }}
              >
                Clear
              </button>
            </>

          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

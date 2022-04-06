import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos, getUsers } from './api/api';

const defaultUser = {
  id: 0,
  createdAt: '',
  updatedAt: '',
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
};

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);

  useEffect(() => {
    getTodos()
      .then(todos => setTodosList(todos));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      getUsers(selectedUserId)
        .then(users => setCurrentUser(users));
    }
  }, [selectedUserId]);

  const handlerSelectUser = (userId: number): void => {
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
          onClickSelectUser={handlerSelectUser}
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
                currentUser={currentUser}
              />
            </>
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

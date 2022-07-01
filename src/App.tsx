import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { fetchTodos } from './api/api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);

  useEffect(
    () => {
      fetchTodos()
        .then(response => {
          return setTodosFromServer(response);
        });
    },
    [],
  );

  const onSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      {todosFromServer.length && (
        <div className="App__sidebar">
          <TodoList
            todoList={todosFromServer}
            handleSelectUser={onSelectUser}
            selectedUserId={selectedUserId}
          />
        </div>
      )}

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              handleSelectUser={onSelectUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

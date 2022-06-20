import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  // eslint-disable-next-line no-console
  console.log(todos);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setError('Todo is not exist');
      });
  }, []);

  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      {error.length === 0
        ? (
          <>
            <div className="App__sidebar">
              <TodoList
                allTodos={todos}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
              />
            </div>

            <div className="App__content">
              <div className="App__content-container">
                {selectedUserId ? (
                  <CurrentUser
                    userId={selectedUserId}
                    selectUser={selectUser}
                  />
                ) : 'No user selected'}
              </div>
            </div>

          </>
        ) : (<span>{error}</span>)}
    </div>
  );
};

export default App;

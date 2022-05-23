import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        setErrorMessage('Can not load todos');
      });
  }, []);

  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      {errorMessage.length === 0 ? (
        <>
          <div className="App__sidebar">
            <TodoList
              todos={todos}
              selectUser={selectUser}
              selectedUserId={selectedUserId}
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
      ) : (<p className="App__error">{errorMessage}</p>)}
    </div>
  );
};

export default App;

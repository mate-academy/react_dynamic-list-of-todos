import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [errorMess, setErrorMess] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => setTodos(todosFromServer))
      .catch(error => setErrorMess(`ERROR: Can't load todos! --- <${error}>`));
  }, []);

  const selectUser = (id: number) => {
    setSelectedUserId(id);
  };

  const clearUser = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        {todos
          ? (
            <TodoList
              todos={todos}
              selectedUserId={selectedUserId}
              selectUser={selectUser}
            />
          )
          : <p>{errorMess}</p>}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={clearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

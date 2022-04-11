import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
/* eslint-disable max-len */

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [queryParamStatus, setQueryParamStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const queryParams = queryParamStatus !== null
      ? `completed=${queryParamStatus}`
      : '';

    getTodos(queryParams)
      .then((todosData) => setTodos(todosData));
  }, [queryParamStatus]);

  const selectUser = useCallback((userId: number) => {
    setSelectedUserId(userId);
  }, []);

  const changeQuery = useCallback((status: boolean | null) => {
    setQueryParamStatus(status);
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          selectUser={selectUser}
          changeQuery={changeQuery}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clear={() => selectUser(0)}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

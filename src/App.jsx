import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import { getTodos } from './api/todos';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setUserId] = useState(0);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const userClear = () => setUserId(0);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onUserIdSelected={setUserId}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              userClear={userClear}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

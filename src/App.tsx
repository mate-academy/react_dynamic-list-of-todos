import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {todos.length ? (
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            onSelect={(userID: number) => {
              setSelectedUserId(userID);
            }}
          />
        ) : 'Loading...'}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={() => setSelectedUserId(0)}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

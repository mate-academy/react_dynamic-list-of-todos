import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {todos ? (
          <TodoList
            todos={todos}
            onSelect={setSelectedUserId}
          />
        ) : (
          <p>loading...</p>
        )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onSetSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

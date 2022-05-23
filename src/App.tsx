import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';

import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const visibleTodos = todos.filter(todo => {
    return (todo.title.toLowerCase().includes(query.toLowerCase()));
  });

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {todos ? (
          <TodoList
            todos={visibleTodos}
            query={query}
            setQuery={setQuery}
            onSelectUserId={setSelectedUserId}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearUser={setSelectedUserId}
            />
          ) : (
            'No user selected'
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

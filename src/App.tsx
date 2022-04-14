import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { Todo } from './types';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const removeSelectedUser = () => setSelectedUserId(0);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data));
  });

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          setId={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onClear={removeSelectedUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

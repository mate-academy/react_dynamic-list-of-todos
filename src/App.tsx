import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodo } from './api/api';
import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const setUserId = (id: number) => {
    setSelectedUserId(id);
  };

  useEffect(() => {
    getTodo()
      .then(response => setTodos(response));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList setUseId={setUserId} todos={todos} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} setUseId={setUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

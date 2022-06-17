import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './react-app-env';
import { getTodos } from './api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList todos={todos} setSelectedUserId={setSelectedUserId} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

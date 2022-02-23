import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './types/Todo';
import { getAllTodos } from './api/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getAllTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList todos={todos} onUserSelect={setSelectedUserId} selectedUserId={selectedUserId} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

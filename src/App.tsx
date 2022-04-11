import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getAllTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await getAllTodos();

      setTodos(result);
    };

    fetchTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onUserSelect={setSelectedUserId}
          userId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              setCurrentUserId={setSelectedUserId}
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnClickButton = (userId: number) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    getTodos().then(response => setTodos(response));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList todos={todos} onButtonClick={handleOnClickButton} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onButtonClick={handleOnClickButton}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

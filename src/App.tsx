import React, { useEffect, useState } from 'react';

import './App.scss';
import './styles/general.scss';

import TodoList from './components/TodoList';
import CurrentUser from './components/CurrentUser';

import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response));
  }, []);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedUserId(Number(event.currentTarget.value));
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          onButtonClick={handleButtonClick}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onButtonClick={handleButtonClick}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

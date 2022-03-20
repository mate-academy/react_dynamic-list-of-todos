import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const chooseUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  const clearUser = () => {
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList chooseUser={chooseUser} selectedUserId={selectedUserId} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser selectedUserId={selectedUserId} clearUser={clearUser} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

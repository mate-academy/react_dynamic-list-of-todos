/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const userIdSelect = (value: number) => (
    setSelectedUserId(value)
  );

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList selectUserId={userIdSelect} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              setSelectedUserId={userIdSelect}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

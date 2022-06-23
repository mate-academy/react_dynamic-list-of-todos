import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const setUser = (userId: number) => {
    return setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectedUserId={selectedUserId}
          setSelectedUserId={setUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} setUserId={setUser} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

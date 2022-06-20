import React, { useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const selectIdOfUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        {/* eslint-disable-next-line max-len */}
        <TodoList selectIdOfUser={selectIdOfUser} selectedUserId={selectedUserId} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            // eslint-disable-next-line max-len
            <CurrentUser selectedUserId={selectedUserId} selectIdOfUser={selectIdOfUser} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useCallback, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const userHandlerId = (id: number) => {
    setSelectedUserId(id);
  };

  const clearHandler = useCallback(() => {
    setSelectedUserId(0);
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList handler={userHandlerId} userId={selectedUserId} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              clearHandler={clearHandler}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

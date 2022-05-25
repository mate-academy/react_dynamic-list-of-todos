import React, { useCallback, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { ToDo } from './types/ToDo';
import { getToDosFromAPI } from './api/api';

import './App.scss';
import './styles/general.scss';

const App: React.FC<{}> = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);
  const [toDos, setToDos] = useState<Array<ToDo>>([]);
  const [isLoadingError, setIsLoadingError] = useState(false);

  const getToDos = useCallback(async () => {
    try {
      const toDosFromServer = await getToDosFromAPI();

      setToDos(toDosFromServer);
      setIsLoadingError(false);
    } catch {
      setToDos([]);
      setIsLoadingError(true);
    }
  }, []);

  const clearSelectedUser = () => {
    setSelectedUserId(0);
  };

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {!isLoadingError ? (
          <TodoList
            toDos={toDos}
            setSelectedUserId={setSelectedUserId}
            selectedUserId={selectedUserId}
          />
        )
          : (
            <>
              <h2>
                Loading Error
              </h2>
              <h3>
                No toDos data
              </h3>
            </>
          )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              clearSelectedUserId={clearSelectedUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

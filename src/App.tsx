import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getData } from './components/API/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [todos, setTodos] = useState([]);
  const [downloadError, setDownloadError] = useState('');

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const dataFromServer = await getData();

        setTodos(dataFromServer);
      } catch {
        setDownloadError('Can\'t download data from server!');
      }
    };

    getDataFromServer();
  }, []);

  const selectNewUser = useCallback((id) => {
    setSelectedUserId(id);
  }, []);

  const onShuffleChange = () => {
    setTodos([...todos].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="App">
      {
        downloadError.length > 0
          ? <h2>{downloadError}</h2>
          : (
            <>
              <div className="App__sidebar">
                <TodoList
                  todos={todos}
                  selectNewUser={selectNewUser}
                  selectedUserId={selectedUserId}
                  onShuffleChange={onShuffleChange}
                />
              </div>

              <div className="App__content">
                <div className="App__content-container">
                  {selectedUserId ? (
                    <CurrentUser
                      userId={selectedUserId}
                      selectNewUser={selectNewUser}
                    />
                  ) : 'No user selected'}
                </div>
              </div>
            </>
          )
      }
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    setHasLoadingError(false);
    setIsLoading(true);

    getTodos()
      .then(todoList => {
        if (!todoList.error) {
          setTodos(todoList);
        } else {
          setHasLoadingError(true);
        }

        setIsLoading(false);
      });
  }, []);

  const sidebarContent = hasLoadingError ? 'Some Error...'
    : (
      <div className="App__sidebar">
        <TodoList
          setSelectedUserId={setSelectedUserId}
          todos={todos}
        />
      </div>
    );

  return (
    <div className="App">
      {isLoading ? 'Loading'
        : sidebarContent}

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

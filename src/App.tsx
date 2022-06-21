import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const selectUser = (userId: number): void => {
    if (selectedUserId !== userId) {
      setSelectedUserId(userId);
    }
  };

  const requestTodos = async () => {
    const todosFromServer = await getTodos();

    setTodos(todosFromServer);
  };

  useEffect(() => {
    requestTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">

        <TodoList
          todos={todos}
          onSelect={selectUser}
          userId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onSelect={selectUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

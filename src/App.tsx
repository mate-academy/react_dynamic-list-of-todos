import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { getTodos } from './api/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then(data => setTodos(data));
  });

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          selectUser={(userId) => {
            setSelectedUserId(userId);
          }}
          todos={todos}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              clearUser={() => {
                setSelectedUserId(0);
              }}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

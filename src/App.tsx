import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const changeUser = (userId: number) => setSelectedUserId(userId);

  useEffect(() => {
    getTodos()
      .then((todosFromServer) => {
        setTodos(todosFromServer);
      });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          changeUser={changeUser}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser selectedUserId={selectedUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

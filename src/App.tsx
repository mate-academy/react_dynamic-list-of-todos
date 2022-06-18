import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const selectIdOfUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList todos={todos} selectIdOfUser={selectIdOfUser} />
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

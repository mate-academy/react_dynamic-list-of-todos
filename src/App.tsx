import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getToDo } from './api/api';
import { Todo } from './react-app-env';

const App: React.FC = () => {
  const [toDos, setToDos] = useState<Todo[]>([]);
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    getToDo().then(setToDos);
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          toDos={toDos}
          selectUser={selectUser}
          selectedUserId={selectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              selectUser={selectUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

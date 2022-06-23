import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('There are no such todos, something went wrong');
      });
  }, []);

  const selectUserId = (userId: number):void => {
    if (userId !== selectedUserId) {
      setSelectedUserId(userId);
    }
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList todos={todos} selectUser={selectUserId} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              onHandlerClear={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

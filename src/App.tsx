import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import * as todosApi from './api/todos';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const emptyArr: Todo[] = [];
  const [todos, newList] = useState(emptyArr);

  useEffect(() => {
    todosApi.getAllTodos()
      .then((newTodos) => {
        return newList(newTodos);
      });
  });

  const setUser = (userId:number) => {
    setSelectedUserId(userId);
  };

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList todos={todos} selectUser={setUser} />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser userId={selectedUserId} />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

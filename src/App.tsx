import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const toState = (callback: () => Promise<Todo[]>) => {
    callback()
      .then(todoList => setTodos(todoList));
  };

  const changeId = (userId: number) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    toState(getTodos);
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          selectedUserId={selectedUserId}
          changeUserId={changeId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              selectingUser={changeId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

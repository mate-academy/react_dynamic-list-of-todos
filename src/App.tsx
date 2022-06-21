import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { Todo } from './react-app-env';
import { getTodos } from './api/api';

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
        ) : 'Loading...'}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          <CurrentUser
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
        </div>
      </div>
    </div>
  );
};

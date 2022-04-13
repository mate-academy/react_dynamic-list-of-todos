import './App.scss';
import './styles/general.scss';
import {
  FC, memo, useEffect, useState,
} from 'react';
import { User } from './components/User';
import { TodoList } from './components/TodoList';
import { SelectedUserIdContext } from './contexts/SelectedUserIdContext';
import { getTodos } from './api/api';

export const App: FC = memo(() => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  return (
    <div className="App">
      <SelectedUserIdContext.Provider
        value={{ selectedUserId, setSelectedUserId }}
      >
        <div className="App__sidebar">
          <TodoList todos={todos} />
        </div>

        <div className="App__content">
          <div className="App__content-container">
            {selectedUserId ? (
              <User />
            ) : 'No user selected'}
          </div>
        </div>
      </SelectedUserIdContext.Provider>
    </div>
  );
});

import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';
import { Todo } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  useEffect(() => {
    const fetchTodos = async () => {
      setTodos(await getTodos());
    };

    try {
      fetchTodos();
    } catch (error) {
      setTodos(null);
    }
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          onUserSelect={setSelectedUserId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onUnselect={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

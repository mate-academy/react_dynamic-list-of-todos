import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/todos';
import { Todo } from './components/types';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    setTodos(await getTodos());
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          setSelectedUserId={setSelectedUserId}
          selectedTodoId={selectedTodoId}
          setSelectedTodoId={setSelectedTodoId}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              setSelectedTodoId={setSelectedTodoId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    setTodos(await getTodos());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList {...{
          todos,
          setSelectedUserId,
          selectedTodoId,
          setSelectedTodoId,
        }}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser {...{
              selectedUserId,
              setSelectedUserId,
              setSelectedTodoId,
            }}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

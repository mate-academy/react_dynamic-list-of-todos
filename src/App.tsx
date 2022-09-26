import React, { useState, useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  const onSetTodos = (query: string) => {
    setTodos((prev: Todo[]) => [...prev]
      .filter(todo => todo.title.includes(query)));
  };

  const selectTodos = (status: string) => {
    switch (status) {
      case 'all':
        getTodos()
          .then(fetchedTodos => setTodos(fetchedTodos));
        break;

      case 'active':
        getTodos()
          .then(fetchedTodos => setTodos(fetchedTodos
            .filter((todo: Todo) => todo.completed === false)));
        break;

      case 'completed':
        getTodos()
          .then(fetchedTodos => setTodos(fetchedTodos
            .filter((todo: Todo) => todo.completed === true)));
        break;

      default:
        getTodos()
          .then(fetchedTodos => setTodos(fetchedTodos));
    }
  };

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => setTodos(fetchedTodos));
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          setSelectedUserId={setSelectedUserId}
          selectedTodoId={selectedTodoId}
          setSelectedTodoId={setSelectedTodoId}
          onSetTodos={onSetTodos}
          onSelectTodos={selectTodos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import 'bulma';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const filterTodos = useCallback((source: string, value: string) => {
    setFilteredTodos(todos
      .filter(todo => {
        if (source === 'input') {
          return todo.title.includes(value);
        }

        switch (value) {
          case 'active':
            return todo.completed === false;
          case 'completed':
            return todo.completed === true;
          case 'all':
          default:
            return todo;
        }
      }));
  }, [filteredTodos]);

  const selectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setFilteredTodos([...todosFromServer]);
      });
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={filteredTodos}
          id={selectedUserId}
          onSelect={selectUser}
          onFilter={filterTodos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              id={selectedUserId}
              onClearSelection={selectUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { Todo } from './react-app-env';
import { getAllTodos } from './apis/api';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';

const App: React.FC = () => {
  const [
    selectedUserId,
    setSelectedUserId,
  ] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = useCallback(
    async () => {
      const loadedTodos = await getAllTodos();

      setTodos(loadedTodos);
    },
    [],
  );

  const loadSelectedUser = useCallback(
    (newSelectedUserId: number) => {
      setSelectedUserId(newSelectedUserId);
    },
    [],
  );

  const searchTodos = (criteria: string) => {
    setTodos(todos.filter(todo => todo.title.includes(criteria)));
  };

  const filterTodos = (criteria: string) => {
    switch (criteria) {
      case 'all':
        loadTodos();
        break;

      case 'active':
        setTodos(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        setTodos(todos.filter(todo => todo.completed));
        break;

      default:
        throw Error('Something went wrong');
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
          userId={selectedUserId}
          onSelectUser={loadSelectedUser}
          onSelectCriteria={filterTodos}
          onSearchTodos={searchTodos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
              onClearSelectedUser={loadSelectedUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

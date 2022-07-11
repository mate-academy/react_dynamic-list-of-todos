import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { Todo } from './react-app-env';
import { getAllTodos, getUser } from './apis/api';
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

      return loadedTodos;
    },
    [],
  );

  const loadSelectedUser = useCallback(
    async (newSelectedUserId: number) => {
      try {
        const checkUser = await getUser(newSelectedUserId);

        if (checkUser?.id) {
          setSelectedUserId(newSelectedUserId);
        }
      } catch {
        setSelectedUserId(0);
      }
    },
    [],
  );

  const searchTodos = async (criteria: string) => {
    const searchedTodos = (await loadTodos())
      .filter(todo => todo.title
        .includes(criteria));

    setTodos(searchedTodos);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const filterTodos = async (criteria: string) => {
    let activeTodos: Todo[];
    let completedtodos: Todo[];

    switch (criteria) {
      case 'all':
        loadTodos();
        break;

      case 'active':
        activeTodos = (await loadTodos()).filter(todo => !todo.completed);

        setTodos(activeTodos);
        break;

      case 'completed':
        completedtodos = (await loadTodos()).filter(todo => todo.completed);
        setTodos(completedtodos);
        break;

      default:
        setTodos([]);
    }
  };

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
          {selectedUserId > 0
            ? (
              <CurrentUser
                userId={selectedUserId}
                onClearSelectedUser={loadSelectedUser}
              />
            ) : 'No user is selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

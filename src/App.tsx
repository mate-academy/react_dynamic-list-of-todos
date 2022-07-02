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

      return loadedTodos;
    },
    [],
  );

  const loadSelectedUser = useCallback(
    (newSelectedUserId: number) => {
      setSelectedUserId(newSelectedUserId);
    },
    [selectedUserId],
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
        throw Error('Something went wrong');
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

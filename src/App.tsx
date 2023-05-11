/* eslint-disable max-len */
import {
  FC,
  useEffect,
  useState,
  useCallback,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const loadTodos = useCallback(async () => {
    try {
      const todosFromServer = await getTodos();

      setIsLoading(false);
      setTodos(todosFromServer);
    } catch {
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleShowModal = (userId: number, todo: Todo) => {
    setIsModalShown(true);
    getUser(userId).then(userFromServer => {
      setSelectedUser(userFromServer);
    });
    setSelectedTodo(todo);
  };

  const handleHideModal = () => {
    setIsModalShown(false);
    setSelectedUser(null);
    setSelectedTodo(null);
  };

  const filterTodos = todos.filter(todo => {
    const formattedQuery = query.trim().toLowerCase();
    const matchesQuery = todo.title.toLowerCase().includes(formattedQuery);

    switch (filterBy) {
      case 'completed':
        return matchesQuery && todo.completed;

      case 'active':
        return matchesQuery && !todo.completed;

      case 'all':
      default:
        return matchesQuery;
    }
  });

  const visibleTodos = filterTodos;

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && hasError && (
                <p className="has-text-danger">
                  Loading error, try again
                </p>
              )}
              {!isLoading && !hasError
                && (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    showModal={handleShowModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isModalShown && (
        <TodoModal
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          hideModal={handleHideModal}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

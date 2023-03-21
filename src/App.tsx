/* eslint-disable max-len */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { debounce, filterTodos } from './helpers';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Modal } from './components/Modal';
import { User } from './types/User';
import { LoadingError } from './components/LoadingError';

export const App: React.FC = () => {
  const filterByOptions = useMemo(() => [
    {
      title: 'All',
      value: 'all',
    },
    {
      title: 'Active',
      value: 'active',
    },
    {
      title: 'Completed',
      value: 'completed',
    },
  ], []);

  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [filterBy, setFilterBy] = useState(filterByOptions[0].value);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const handleSelect = useCallback(
    (value: string) => setFilterBy(value), [filterBy],
  );

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      applyQuery(value);
    }, [],
  );

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setHasLoadingError(true));
  }, []);

  const visibleTodos = useMemo(() => filterTodos(todos, filterBy, appliedQuery),
    [todos, appliedQuery, query, filterBy]);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
    setSelectedTodoId(0);
    setUser(null);
  }, [isOpenModal, user]);

  const showTodoInfo = useCallback((currentTodo: Todo) => {
    setLoading(true);
    setIsOpenModal(true);
    setTodo(currentTodo);
    setSelectedTodoId(currentTodo.id);

    getUser(currentTodo.userId)
      .then(data => {
        setLoading(false);
        setUser(data);
      })
      .catch(() => setLoading(false));
  }, [todo, user]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {(!todos.length && !hasLoadingError) && <Loader />}

            {todos.length > 0 && (
              <>
                <div className="block">
                  <TodoFilter
                    query={query}
                    disabled={!visibleTodos.length}
                    filterByOptions={filterByOptions}
                    onSelect={handleSelect}
                    onChange={handleSearch}
                  />
                </div>
                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    showTodoInfo={showTodoInfo}
                  />
                </div>
              </>
            )}
            {hasLoadingError && (
              <LoadingError textError="todos" />
            )}
          </div>
        </div>
      </div>
      {isOpenModal && (
        <Modal
          loading={loading}
          todo={todo}
          user={user}
          onClose={closeModal}
        />
      )}
    </>
  );
};

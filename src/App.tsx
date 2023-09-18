/* eslint-disable max-len */
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filters } from './types/Filters';
import { filterTodos } from './utils/filterTodos';
import { FilterParams } from './utils/FilterParams';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterParam, setFilterParam] = useState<Filters>({
    select: FilterParams.All,
    query: '',
  });

  const [userId, setUserId] = useState(0);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Invalid request URL'))
      .finally(() => setIsLoading(false));
  }, []);

  const changeFilterParam = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterParam((prev) => ({ ...prev, select: event.target.value as FilterParams }));
  };

  const filteredTodos = useMemo(() => (
    filterTodos(filterParam, todos)
  ), [filterParam, todos]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterParam((prev) => ({ ...prev, query: event.target.value }));
  };

  const resetQuery = () => {
    setFilterParam((prev) => ({ ...prev, query: '' }));
  };

  const selectUser = (id: number) => {
    setUserId(id);
  };

  const selectTodo = (todoId: number) => {
    setSelectedTodo(todos?.find(({ id }) => id === todoId) || null);
  };

  const hideModal = () => {
    setSelectedTodo(null);
    setUserId(0);
    setIsModalActive(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterParam={filterParam}
                onFilterChange={changeFilterParam}
                onSearch={handleSearch}
                onReset={resetQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  selectTodo={selectTodo}
                  selectUser={selectUser}
                  setModal={setIsModalActive}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalActive && (
        <TodoModal
          todo={selectedTodo}
          userId={userId}
          onHide={hideModal}
        />
      )}
      {errorMessage && (
        <ErrorMessage errorMessage={errorMessage} />
      )}
    </>
  );
};

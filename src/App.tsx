/* eslint-disable max-len */
import React, {
  useEffect, useState, useCallback,
} from 'react';

import { TodoList } from './components/TodoList';
import { TodoFilter, FilterTypes } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

// eslint-disable-next-line @typescript-eslint/ban-types
const debounce = (f: Function, delay: number) => {
  let timerId: ReturnType<typeof Number>;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalTodo, setModalTodo] = useState<Todo>();
  const [query, setQuery] = useState<string>('');
  const [appliedQuery, setAppliedQuery] = useState<string>('');
  const [filter, setFilter] = useState(FilterTypes.All);
  const [isLoader, setIsLoader] = useState<boolean>(true);

  useEffect(() => {
    setIsLoader(true);

    getTodos()
      .then(fetchTodos => {
        setIsLoader(false);
        setTodos(appliedQuery ? fetchTodos
          .filter(todo => todo.title.toLowerCase()
            .includes(appliedQuery.toLowerCase())) : fetchTodos);
      });
  }, [appliedQuery]);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const handleSearchTodo = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setAppliedQuery('');
  };

  const closeModal = () => {
    setModalTodo(undefined);
  };

  const filteredTodos = filter === FilterTypes.All ? todos : todos.filter((todo) => {
    if (filter === FilterTypes.Completed) {
      return todo.completed;
    }

    return !todo.completed;
  });

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setFilter(event.target.value as FilterTypes);
  };

  const onClickTodo = (currentTodo: Todo) => setModalTodo(currentTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onSearch={handleSearchTodo}
                onClearSearch={clearSearch}
                onFilter={handleFilterChange}
                filter={filter}
              />
            </div>

            <div className="block">
              {isLoader
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    onClickTodo={onClickTodo}
                    modal={modalTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalTodo
        && (
          <TodoModal
            modalTodo={modalTodo}
            сloseModal={closeModal}
          />
        )}

    </>
  );
};

/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterOptions } from './types/FilterOptions';

function prepareTodos(allTodos: Todo[], currentQuery: string, currentFilter: FilterOptions) {
  let preparedTodos = [] as Todo[];

  switch (currentFilter) {
    case FilterOptions.All:
    default:
      preparedTodos = [...allTodos];
      break;
    case FilterOptions.Active:
      preparedTodos = allTodos.filter(todo => !todo.completed);
      break;
    case FilterOptions.Completed:
      preparedTodos = allTodos.filter(todo => todo.completed);
      break;
  }

  if (currentQuery) {
    preparedTodos = preparedTodos.filter(todo => (
      todo.title.toLowerCase().includes(currentQuery.toLowerCase())
    ));
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [activeTodo, setActiveTodo] = useState({} as Todo);
  const [filter, setFilter] = useState(FilterOptions.All);
  const [query, setQuery] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (item: Todo) => {
    setActiveTodo(item);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setActiveTodo({} as Todo);
  };

  const handleFilter = (filterName: FilterOptions) => {
    setFilter(filterName);
  };

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleDelete = () => {
    setQuery('');
  };

  const availabelTodos = useMemo(() => prepareTodos(todos, query, filter), [todos, query, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleClick={handleFilter}
                handleQuery={handleQuery}
                query={query}
                handleDelete={handleDelete}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={availabelTodos}
                  handleClick={handleClick}
                  activeTodo={activeTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal selectedTodo={activeTodo} hideModal={handleHideModal} />
      )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

type FilterOption = 'all' | 'active' | 'completed';

const filterTodos = (todos: Todo[], filter: FilterOption, query = '') => {
  let filtered = todos;

  switch (filter) {
    case 'active':
      filtered = todos.filter(todo => !todo.completed);
      break;
    case 'completed':
      filtered = todos.filter(todo => todo.completed);
      break;
    default:
      filtered = todos;
  }

  if (query) {
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filtered;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteringOption, setFilteringOption] = useState<FilterOption>('all');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const onModalShowClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalIsActive(true);
  };

  const onModalCloseClick = () => {
    setSelectedTodo(null);
    setModalIsActive(false);
  };

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteringOption(event.target.value as FilterOption);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onQueryClear = () => {
    setQuery('');
  };

  const visibleTodos = filterTodos(todos, filteringOption, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={onFilterChange}
                onInputChange={onInputChange}
                onQueryClear={onQueryClear}
                filteringOption={filteringOption}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onModalShowClick={onModalShowClick}
                selectedTodo={selectedTodo}
                onModalCloseClick={onModalCloseClick}
              />
            </div>
          </div>
        </div>
      </div>

      {modalIsActive && (
        <TodoModal todo={selectedTodo} onModalCloseClick={onModalCloseClick} />
      )}
    </>
  );
};

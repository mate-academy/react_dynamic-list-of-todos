/* eslint-disable max-len */
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.all);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as FilterType);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const queryCleaner = () => {
    setQuery('');
  };

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleSelectedTodoClear = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = useMemo(() => {
    const filtered = getFilteredTodos(todos, filter);

    if (query) {
      return filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase().trimStart()),
      );
    }

    return filtered;
  }, [filter, query, todos]);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filter}
                setFilter={handleFilterChange}
                query={query}
                setQuery={handleQueryChange}
                cleaner={queryCleaner}
              />
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="block">
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={handleTodoSelect}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} handleTodoClear={handleSelectedTodoClear} />
      )}
    </>
  );
};

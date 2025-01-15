/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { SelectFilter } from './types/SelectFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState<SelectFilter>(SelectFilter.ALL);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  const handleSelectChange = (newFilter: SelectFilter) => {
    setFilter(newFilter);
  };

  const handleModalChange = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const filteredTodos = todos.filter(
    e =>
      e.title.toLowerCase().includes(query.toLowerCase().trim()) ||
      String(e.id).includes(query.toLowerCase().trim()),
  );

  const getFilteredTodos = () => {
    switch (filter) {
      case SelectFilter.ACTIVE:
        return filteredTodos.filter(todo => !todo.completed);

      case SelectFilter.COMPLETED:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChange={handleChange}
                resetQuery={resetQuery}
                query={query}
                selectedFilter={filter}
                onHandleSelectChange={handleSelectChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && filteredTodos.length > 0 && (
                <TodoList
                  todos={getFilteredTodos()}
                  selectedTodo={selectedTodo}
                  handleModalChange={handleModalChange}
                />
              )}

              {!loading && filteredTodos.length === 0 && (
                <p className="title is-5">There are no users</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleModalChange={handleModalChange}
        />
      )}
    </>
  );
};

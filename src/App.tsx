/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(Filter.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteringTodos = useMemo(() => {
    let filterTodos = [...todos];

    if (query) {
      filterTodos = filterTodos.filter(todo => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    return filterTodos.filter(todo => {
      if (filter === Filter.ALL) {
        return true;
      }

      if (filter === Filter.ACTIVE) {
        return !todo.completed;
      }

      return todo.completed;
    });
  }, [filter, todos, query]);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={setFilter}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteringTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onDelete={setSelectedTodo} />
      )}
    </>
  );
};

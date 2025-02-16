/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoStatus } from './types/TodoStatus';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<TodoStatus>(TodoStatus.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  const handleQueryReset = () => {
    setQuery('');
  };

  const filteredTodos = useMemo(() => {
    const filtered = getFilteredTodos(todos, filterBy);

    return filtered.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [filterBy, query, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                query={query}
                onFilterChange={event =>
                  setFilterBy(event.target.value as TodoStatus)
                }
                onQueryChange={event => setQuery(event.target.value)}
                onClearQuery={handleQueryReset}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelectedTodo={handleSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleClose} />
      )}
    </>
  );
};

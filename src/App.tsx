/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from 'lodash.debounce';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getVisibleTodos = (todos: Todo[], filter: string, query: string) => {
    let filteredTodos = todos;

    // Apply filter based on status
    if (filter === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    // Apply search query filter
    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filteredTodos;
  };

  const applyQuery = useCallback(debounce(setAppliedQuery, 300), []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setQuery(inputValue);
    applyQuery(inputValue);
  };

  const handleClearSearch = () => {
    setQuery('');
    setAppliedQuery('');
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, filter, appliedQuery);
  }, [todos, filter, appliedQuery]);

  const handleModalClick = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleInputChange={handleInputChange}
                query={query}
                onFilterChange={handleFilterChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            {loading && <Loader />}

            {!loading && visibleTodos.length > 0 && (
              <div className="block">
                <TodoList
                  todos={visibleTodos}
                  handleModalClick={handleModalClick}
                  selectedTodo={selectedTodo}
                />
              </div>
            )}

            {!loading && visibleTodos.length === 0 && (
              <div className="block">No todos found</div>
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default App;

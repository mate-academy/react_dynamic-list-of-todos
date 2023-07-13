/* eslint-disable max-len */
import React, {
  useState, useMemo, MouseEvent, ChangeEvent, useEffect,
} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterBy } from './types/FilterBy';
import { filterTodos } from './util';

export const App: React.FC = () => {
  // #region states
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [query, setQuery] = useState('');
  // #endregion

  // #region handlers
  const handleTodoSelect = (event: MouseEvent<HTMLButtonElement>, todo: Todo) => {
    event.preventDefault();
    setSelectedTodo(todo);
  };

  const handleFilterByChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as FilterBy);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setQuery('');
  };

  const handleModalClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedTodo(null);
  };
  // #endregion

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return filterTodos(todos, filterBy, query);
  }, [todos, filterBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBy={filterBy}
                onQueryChange={handleQueryChange}
                onFilterByChange={handleFilterByChange}
                onQueryClear={handleQueryClear}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} selectedTodo={selectedTodo} onTodoSelect={handleTodoSelect} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={handleModalClose} />}
    </>
  );
};

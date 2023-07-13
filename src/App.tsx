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
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterBy } from './types/FilterBy';
import { filterTodos } from './util';

export const App: React.FC = () => {
  // #region states
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [query, setQuery] = useState('');
  // #endregion

  // #region handlers
  const handleTodoSelect = (event: MouseEvent<HTMLButtonElement>, todoId: number) => {
    event.preventDefault();
    setSelectedTodoId(todoId);
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
  // #endregion

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
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
                <TodoList todos={visibleTodos} selectedTodoId={selectedTodoId} onTodoSelect={handleTodoSelect} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};

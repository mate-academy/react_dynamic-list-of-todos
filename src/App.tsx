/* eslint-disable max-len */
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';

import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  const handleChangeFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value as FilterBy);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClearQuery = () => {
    setQuery('');
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = useMemo(() => {
    const filtered = getFilteredTodos(todos, filterBy);

    return filtered.filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
  }, [filterBy, query, todos]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .then(() => setIsLoading(false));
  }, []);

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
                onFilterChange={handleChangeFilter}
                onQueryChange={handleQueryChange}
                onClearQuery={handleClearQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={filteredTodos}
                selectedTodo={selectedTodo}
                onSelectTodo={handleSelectTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { debounce } from './utils/debounce';
import { getFilteredList } from './utils/helpers/getFilteredList';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterName, setFilterName] = useState<Filter>(Filter.all);
  const [appliedQuery, setAppliedQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const applyQuery = debounce(setAppliedQuery, 300);

  function handleSelectedTodo(todo: Todo) {
    setSelectedTodo(todo);
  }

  function handleSetFilterName(event: React.ChangeEvent<HTMLSelectElement>) {
    setFilterName(event.target.value as Filter);
  }

  function handleSetSearchQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    applyQuery(event.target.value);
  }

  function handleClearSearchQuery() {
    setSearchQuery('');
    applyQuery('');
  }

  const visibleTodos: Todo[] = useMemo(
    () => getFilteredList(todos, filterName, appliedQuery),
    [todos, filterName, appliedQuery],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                onSetFilterName={handleSetFilterName}
                onSetSearchQuery={handleSetSearchQuery}
                clearQuery={handleClearSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectedTodo={handleSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onCloseModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};

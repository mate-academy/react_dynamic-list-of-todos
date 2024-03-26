import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterStatus } from './types/FilterStatus';
import { filterTodos } from './utils/filteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        setErrorMessage(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  function handleShowModal(todo: Todo) {
    setSelectedTodo(todo);
  }

  const filteredTodos = useMemo(
    () => filterTodos(todos, filterStatus, query),
    [filterStatus, todos, query],
  );

  function handleChangeFilterStatus(status: FilterStatus) {
    setFilterStatus(status);
  }

  function handleChangeQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function handleClearSearch() {
    setQuery('');
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeFilter={handleChangeFilterStatus}
                filterStatus={filterStatus}
                query={query}
                onChangeQuery={handleChangeQuery}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && filteredTodos.length > 0 && !errorMessage && (
                <TodoList
                  todos={filteredTodos}
                  onShowModal={handleShowModal}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

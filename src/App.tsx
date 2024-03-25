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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setLoading(false);
      })
      .catch(error => {
        setErrorMessage(error);
        setLoading(false);
      });
  }, []);

  function handleShowModal(todo: Todo) {
    setLoadingModal(true);
    setSelectedTodo(todo);
  }

  const filteredTodos = useMemo(() => {
    function filterTodos(todoItems: Todo[]): Todo[] {
      let filtered = todoItems.filter(todo => {
        switch (filterStatus) {
          case FilterStatus.ALL:
            return true;
          case FilterStatus.ACTIVE:
            return !todo.completed;
          case FilterStatus.COMPLETED:
            return todo.completed;
          default:
            return false;
        }
      });

      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );

      return filtered;
    }

    return filterTodos(todos);
  }, [filterStatus, todos, query]);

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
                onFilter={handleChangeFilterStatus}
                filterStatus={filterStatus}
                query={query}
                onChangeQuery={handleChangeQuery}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && filteredTodos.length > 0 && !errorMessage && (
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
          isLoadingModal={isLoadingModal}
          setLoadingModal={setLoadingModal}
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

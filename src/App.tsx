import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [statusFilter, setStatusFilter] = useState<FilterType>('all');

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (statusFilter === 'active') {
          return !todo.completed;
        }

        if (statusFilter === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo =>
        todo.title.toLowerCase().includes(searchFilter.toLowerCase()),
      );
  }, [todos, statusFilter, searchFilter]);

  const handleStatusFilterChange = (value: FilterType) => {
    setStatusFilter(value);
  };

  const handleSearchQueryChange = (value: string) => {
    setSearchFilter(value);
  };

  const handleSelectTodo = (id: number) => {
    setSelectedTodoId(id);
  };

  const handleCloseModal = () => {
    setSelectedTodoId(0);
  };

  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                onStatusChange={handleStatusFilterChange}
                searchFilter={searchFilter}
                onQueryChange={handleSearchQueryChange}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}

              <TodoList
                todos={visibleTodos}
                onSelect={handleSelectTodo}
                selectedTodoId={selectedTodoId}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};

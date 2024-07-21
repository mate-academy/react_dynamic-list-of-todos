/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const onDeleteSearchChange = () => {
    setSearchTerm('');
  };

  const handleClose = () => {
    setSelectTodo(null);
  };

  const handleOpen = (todo: Todo) => {
    setSelectTodo(todo);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === FILTERS.ALL ||
        (status === FILTERS.ACTIVE && !todo.completed) ||
        (status === FILTERS.COMPLETED && todo.completed)
      const matchesSearch = todo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [todos, status, searchTerm]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                searchTerm={searchTerm}
                onStatusChange={handleStatusChange}
                onSearchChange={handleSearchChange}
                onDeleteSearchChange={onDeleteSearchChange}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onOpen={handleOpen}
                  selectedTodoId={selectTodo?.id || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && <TodoModal todo={selectTodo} onClose={handleClose} />}
    </>
  );
};
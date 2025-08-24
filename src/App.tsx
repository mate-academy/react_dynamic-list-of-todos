/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
type StatusFilter = 'all' | 'active' | 'completed';
export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [queryFilter, setQueryFilter] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'completed' && todo.completed) ||
        (statusFilter === 'active' && !todo.completed);

      const matchesQuery =
        queryFilter === '' ||
        todo.title.toLowerCase().includes(queryFilter.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [todos, statusFilter, queryFilter]);

  const handleShowTodo = (todo: Todo) => {
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
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                queryFilter={queryFilter}
                setQueryFilter={setQueryFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleShowTodo}
                  selectedTodo={selectedTodo}
                />
              )}
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

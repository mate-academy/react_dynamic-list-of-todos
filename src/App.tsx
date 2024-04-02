/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { StatusFilterValue, Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { TodoStatus } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('all');
  const [query, setQuery] = useState('');

  const handleTogglingTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const getPreparedTodos = () => {
    let result = [...todos];

    if (statusFilter === TodoStatus.Completed) {
      result = result.filter(todo => todo.completed);
    }

    if (statusFilter === TodoStatus.Active) {
      result = result.filter(todo => !todo.completed);
    }

    if (query) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return result;
  };

  const preparedTodos = getPreparedTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusSelected={setStatusFilter}
                statusFilter={statusFilter}
                onQueryChange={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !!preparedTodos.length && (
                <TodoList
                  todos={preparedTodos}
                  onTodoSelected={handleTogglingTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={handleTogglingTodo} />
      )}
    </>
  );
};

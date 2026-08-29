/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const handleSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo)
  }, []);
  const handleCloseTodo = useCallback(() => {
    setSelectedTodo(null);
  }, []);
  const onQueryChange = useCallback((query: string) => {
    setQuery(query);
  }, [])
  const onStatusChange = useCallback((status: string) => {
    setStatus(status);
  }, [])

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && todo.completed) ||
        (status === 'active' && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return matchesStatus && matchesQuery;
    }, [todos, query, status]);
  })

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onQueryChange={onQueryChange} onStatusChange={onStatusChange} query={query} status={status} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList todos={filteredTodos} selectedTodo={selectedTodo} onSelect={handleSelectTodo} />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClose={handleCloseTodo} />}
    </>
  );
};

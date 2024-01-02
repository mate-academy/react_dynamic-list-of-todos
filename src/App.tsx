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
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Status.ALL);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const displayedTodos = useMemo(() => {
    const filteredTodos = todos.filter(todo => {
      const statusFilter
      = filter === Status.ALL
      || (filter === Status.COMPLETED && todo.completed)
      || (filter === Status.ACTIVE && !todo.completed);

      const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase());

      return statusFilter && queryFilter;
    });

    return filteredTodos;
  }, [todos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter query={query} setQuery={setQuery} setFilter={setFilter} />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && todos.length > 0 && (
                <TodoList todo={displayedTodos} selectedTodo={selectedTodo} setSelectedTodo={setSelectedTodo} />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && <TodoModal selectedTodo={selectedTodo} handleCloseModal={handleCloseModal} />}
    </>
  );
};
/* */

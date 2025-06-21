/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      if (status === 'completed') {
        return todo.completed;
      }

      if (status === 'active') {
        return !todo.completed;
      }

      return true;
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                status={status}
                onStatusChange={setStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList todos={filteredTodos} onSelect={handleSelectTodo} />
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

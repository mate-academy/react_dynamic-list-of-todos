/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [status, setStatus] = useState('all');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleCloseButton = () => {
    setSelectedTodo(undefined);
  };

  useMemo(() => {
    setVisibleTodos(
      todos.filter(todo => {
        return (
          (status === 'completed'
            ? todo.completed
            : status === 'active'
              ? !todo.completed
              : todo) && todo.title.toLowerCase().includes(query.toLowerCase())
        );
      }),
    );
  }, [status, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              <TodoList
                todos={visibleTodos}
                setTodo={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseButton={handleCloseButton}
        />
      )}
    </>
  );
};

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
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Try again later'))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    if (filterStatus === 'active' && todo.completed) {
      return false;
    }

    if (filterStatus === 'completed' && !todo.completed) {
      return false;
    }

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());

    return matchesSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            {errorMessage && (
              <div className="notification is-danger is-light">
                {errorMessage}
              </div>
            )}

            <div className="block">
              <TodoFilter
                status={filterStatus}
                query={searchQuery}
                onStatusChange={setFilterStatus}
                onQueryChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodoId={selectedTodo ? selectedTodo.id : null}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
    </>
  );
};

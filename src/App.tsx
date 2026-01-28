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
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<
    'all' | 'active' | 'completed'
  >('all');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const getVisibleTodos = () => {
    return todos.filter(todo => {
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'completed' && todo.completed) ||
        (selectedStatus === 'active' && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                selectedStatus={selectedStatus}
                onQueryChange={setQuery}
                onStatusChange={setSelectedStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={getVisibleTodos()}
                onSelectTodo={setCurrentTodo}
              />
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={currentTodo} onClose={() => setCurrentTodo(null)} />
    </>
  );
};

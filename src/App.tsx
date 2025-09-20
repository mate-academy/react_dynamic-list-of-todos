/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const filterProps = { filter, query, setFilter, setQuery };
  const modalProps = { selectedTodo, setSelectedTodo };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLocaleLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);

    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter {...filterProps} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} {...modalProps} />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
    </>
  );
};

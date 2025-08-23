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
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && todo.completed) ||
      (status === 'active' && !todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLocaleLowerCase());

    return matchesStatus && matchesQuery;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={val =>
                  setStatus(val as 'all' | 'active' | 'completed')
                }
                query={query}
                onQueryChange={setQuery}
                onClearQuery={() => setQuery('')}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};

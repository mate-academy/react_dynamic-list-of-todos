/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setIsLoading(false));
  }, []);

  let visibleTodos = todos;

  if (filter === 'active') {
    visibleTodos = todos.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    visibleTodos = todos.filter(todo => todo.completed);
  }

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  activeTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} setSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};

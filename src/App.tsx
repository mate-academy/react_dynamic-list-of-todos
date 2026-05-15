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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');

  let visibleTodos = todos;

  if (status === 'completed') {
    visibleTodos = todos.filter(todo => todo.completed);
  }

  if (status === 'active') {
    visibleTodos = todos.filter(todo => !todo.completed);
  }

  if (query) {
    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusChange={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onSelect={setSelectedTodo}
              />
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

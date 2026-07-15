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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Помилка при завантаженні:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let visibleTodos = todos;

  if (filterStatus === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  } else if (filterStatus === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
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
                query={query}
                onQueryChange={setQuery}
                status={filterStatus}
                onStatusChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={visibleTodos}
                onSelectTodo={setSelectedTodo}
                selectedTodoId={selectedTodo?.id}
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

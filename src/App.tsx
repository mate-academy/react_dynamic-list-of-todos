/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';

import { getTodos } from './api';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

function filterTodos(
  todos: Todo[],
  cleanQuery: string,
  filter: string,
): Todo[] {
  const filtered = filter === 'all';
  const convertedFilter = filter === 'completed' ? true : false;

  return todos.filter(
    todo =>
      todo.title.toLowerCase().includes(cleanQuery) &&
      (filtered || convertedFilter === todo.completed),
  );
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const cleanQuery = query.trim().toLowerCase();

  const filteredTodos = useMemo<Todo[]>(() => {
    if (todos) {
      return filterTodos(todos, cleanQuery, status);
    }

    return todos;
  }, [todos, status, cleanQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                onStatusSelect={setStatus}
                query={query}
                onQueryChange={setQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClosed={() => setSelectedTodo(null)} />
      )}
    </>
  );
};

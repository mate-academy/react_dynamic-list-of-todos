/* eslint-disable max-len */
import React from 'react';
import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todo } from './types/Todo';
import { TodoStatusFilter } from './types/TodoStatusFilter';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<TodoStatusFilter>(
    TodoStatusFilter.All,
  );
  const [search, setSearch] = useState<string>('');

  const getFilteredTodos = (
    sourceTodos: Todo[],
    {
      status,
      search: searchTerm,
    }: { status: TodoStatusFilter; search: string },
  ): Todo[] => {
    let filteredTodos = [...sourceTodos];

    if (status !== TodoStatusFilter.All) {
      filteredTodos = filteredTodos.filter(todo => {
        if (status === TodoStatusFilter.Completed) {
          return todo.completed;
        }

        return !todo.completed;
      });
    }

    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (normalizedSearch) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedSearch),
      );
    }

    return filteredTodos;
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        alert('Failed to fetch todos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = getFilteredTodos(todos, {
    status: statusFilter,
    search,
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={statusFilter}
                onStatusChange={setStatusFilter}
                search={search}
                onSearchChange={setSearch}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodo?.id ?? null}
                  onSelectTodo={setSelectedTodo}
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

/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [isLoading, setLoading] = useState(true);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [statusFilter, setStatusFilter] = useState<
  'all' | 'active' | 'completed'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(res => setTodos(res))
      .catch(error => {
        console.error('Failed to load todos:', error);
        setTodos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const watchSelectTodo = useCallback((todo: Todo) => {
    setSelectTodo(todo);
  }, []);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (statusFilter === 'all') {
          return true;
        }

        if (statusFilter === 'active') {
          return !todo.completed;
        }

        if (statusFilter === 'completed') {
          return todo.completed;
        }

        return true;
      })
      .filter(todo => {
        return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
  }, [todos, statusFilter, searchQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeStatus={setStatusFilter}
                onSearch={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={watchSelectTodo}
                  selectedTodoId={selectTodo?.id ?? null}
                  onUnselect={() => setSelectTodo(null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo && (
        <TodoModal
          selectTodo={selectTodo}
          onClose={() => setSelectTodo(null)}
        />
      )}
    </>
  );
};

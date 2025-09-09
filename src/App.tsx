/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
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
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [textFilter, setTextFilter] = useState('');

  useEffect(() => {
    setLoading(true);

    const controller = new AbortController();

    getTodos({ signal: controller.signal })
      .then(setTodos)
      .catch(error => {
        if (error.name !== 'AbortError') {
          setTodos([]);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const visibleTodos = useMemo(() => {
    let filtered = todos;

    if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (textFilter) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(textFilter.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, filter, textFilter]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectTodo(todo);
  };

  const handleCloseTodo = () => {
    setSelectTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={value => setFilter(value)}
                onQuery={query => setTextFilter(query)}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelectTodo}
                  selectTodoId={selectTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal todo={selectTodo} onClose={handleCloseTodo} />
    </>
  );
};

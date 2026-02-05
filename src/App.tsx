/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status>('all');
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => setTodos(todosFromServer))
      .catch(() => {
        setTodos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    if (filterStatus === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    if (filterStatus === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (filterQuery.trim()) {
      const q = filterQuery.trim().toLowerCase();

      result = result.filter(todo => todo.title.toLowerCase().includes(q));
    }

    return result;
  }, [todos, filterStatus, filterQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onStatusChange={setFilterStatus}
                onQueryChange={setFilterQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onSelectTodo={setSelectedTodo} />
      )}
    </>
  );
};

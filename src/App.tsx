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

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingTodos, setLoadingTodos] = useState(true);

  const [status, setStatus] = useState<Status>('all');
  const [query, setQuery] = useState('');

  const [selected, setSelected] = useState<Todo | null>(null);

  useEffect(() => {
    setLoadingTodos(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoadingTodos(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let list = todos;

    if (status !== 'all') {
      list = list.filter(t =>
        status === 'completed' ? t.completed : !t.completed,
      );
    }

    if (query.trim()) {
      const q = query.toLowerCase();

      list = list.filter(t => t.title.toLowerCase().includes(q));
    }

    return list;
  }, [todos, status, query]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos</h1>

          <div className="block">
            <TodoFilter
              status={status}
              onStatusChange={setStatus}
              query={query}
              onQueryChange={setQuery}
              onClearQuery={() => setQuery('')}
            />
          </div>

          <div className="block">
            {loadingTodos ? (
              <Loader />
            ) : (
              <TodoList
                todos={visibleTodos}
                selectedId={selected?.id ?? null}
                onSelect={todo =>
                  setSelected(prev => (prev?.id === todo.id ? null : todo))
                }
              />
            )}
          </div>
        </div>
      </div>

      {selected && (
        <TodoModal todo={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

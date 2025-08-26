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

type Status = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [status, setStatus] = useState<Status>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const data = await getTodos();

        if (isMounted) {
          setTodos(data);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredTodos = useMemo(() => {
    let list = todos;

    if (status === 'completed') {
      list = list.filter(t => t.completed);
    } else if (status === 'active') {
      list = list.filter(t => !t.completed);
    }

    const q = query.trim().toLowerCase();

    if (q) {
      list = list.filter(t => t.title.toLowerCase().includes(q));
    }

    return list;
  }, [todos, status, query]);

  const handleClearQuery = () => setQuery('');
  const closeModal = () => setSelectedTodo(null);

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
                status={status}
                onStatusChange={setStatus}
                onClearQuery={handleClearQuery}
              />
            </div>
            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                selectedId={selectedTodo?.id ?? null}
                onShow={setSelectedTodo}
                onHide={() => setSelectedTodo(null)}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} clearHandler={closeModal} />
      )}
    </>
  );
};

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

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [query, setQuery] = useState('');

  const onSearch = (search: string) => {
    setQuery(search);
  };

  const filtration = (method: string) => {
    setStatus(method as 'all' | 'active' | 'completed');
  };

  const visibleTodos = useMemo(() => {
    let filtered = allTodos;

    if (status !== 'all') {
      filtered = filtered.filter(todo =>
        status === 'completed' ? todo.completed : !todo.completed,
      );
    }

    if (query) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [allTodos, status, query]);

  const openModal = (t: Todo) => {
    setSelectedTodo(t);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setAllTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={filtration}
                onSearch={onSearch}
                query={query}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onShow={openModal}
                  modalOpen={modalOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
};

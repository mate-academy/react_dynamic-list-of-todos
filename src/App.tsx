/* eslint-disable max-len */
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import type { Todo } from './types/Todo';
import { getTodos } from './servises/getTodos';
import debounce from 'lodash/debounce';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // стан для тодос
  const [error, setError] = useState<Error | null>(null); // стан для помилки завантаження
  const [loading, setLoading] = useState(true); // стан для лоадінг основний

  const [isModal, setIsModal] = useState(false); // стан для показу модалки
  const [selected, setSelected] = useState<Todo | null>(null); // стан для обраного рядка з ліста
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all'); // стан для фільтрації
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      setSearch(value);
    }, 300);
  }, []);

  const clearSearch = () => {
    setSearch('');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const current = event.target.value;

    debouncedSearch(current);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'all' | 'active' | 'completed');
  };

  const visibleTodos = useMemo(() => {
    let filtered = todos;

    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    const normalizedSearch = search.trim().toLowerCase();

    if (normalizedSearch !== '') {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(normalizedSearch),
      );
    }

    return filtered;
  }, [todos, filter, search]);

  const showModal = (item: Todo): void => {
    setSelected(item);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setLoading(false);
        setTodos([...data]);
      })
      .catch(err => {
        setLoading(false);
        setError(err);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChange={handleChange}
                search={search}
                handleSearch={handleSearch}
                clearSearch={clearSearch}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && error && <p>{error.message}</p>}
              {!loading && !error && (
                <TodoList todos={visibleTodos} showModal={showModal} />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModal && selected && (
        <TodoModal selected={selected} closeModal={closeModal} />
      )}
    </>
  );
};

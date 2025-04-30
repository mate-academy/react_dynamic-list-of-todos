/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loaderIsVisible, setLoaderIsVisible] = useState(true);
  const [fullTodos, setFullTodos] = useState([] as Todo[]);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'completed'>('all');

  const visibleTodos = useMemo(() => {
    let list = fullTodos;

    if (status === 'active') {
      list = list.filter(t => !t.completed);
    }

    if (status === 'completed') {
      list = list.filter(t => t.completed);
    }

    if (query.trim()) {
      const q = query.toLowerCase();

      list = list.filter(t => t.title.toLowerCase().includes(q));
    }

    return list;
  }, [fullTodos, status, query]);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await getTodos();

      setFullTodos(todos);
      setLoaderIsVisible(false);
    };

    loadTodos();
  }, []);

  const handleSelect = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleClose = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={status}
                onSelect={value => setStatus(value as typeof status)}
                onQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loaderIsVisible ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelect={handleSelect}
                  selected={selectedTodo?.id ?? null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal todo={selectedTodo} onClick={handleClose} />}
    </>
  );
};

/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtered, setFiltered] = useState<Todo[]>([]);
  const [search, setSearch] = useState('');
  // eslint-disable-next-line prettier/prettier
  const [currentFilter, setCurrentFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    getTodos()
      .then(tods => {
        setTodos(tods);
        setFiltered(tods);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...todos];

    if (currentFilter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    if (search.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFiltered(result);
  }, [todos, currentFilter, search]);

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    setCurrentFilter(filter);
  };

  const handleSearchChange = (query: string) => {
    setSearch(query);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {loading && filtered.length === 0 && <Loader />}
              <TodoList
                todos={filtered}
                loading={loading}
                selectedTodoId={selectedTodo?.id || null}
                onSelect={todo => {
                  if (selectedTodo?.id === todo.id) {
                    setSelectedTodo(null);
                    setIsModalOpen(false);
                  } else {
                    setSelectedTodo(todo);
                    setIsModalOpen(true);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && isModalOpen && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTodo(null);
          }}
        />
      )}
    </>
  );
};

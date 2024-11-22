import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    let filtered = [...todos];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(todo =>
        statusFilter === 'active' ? !todo.completed : todo.completed,
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [statusFilter, searchQuery, todos]);

  return (
    <div className="section">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                onStatusChange={setStatusFilter}
                onSearchChange={setSearchQuery}
              />
            </div>

            <div className="block">
              <TodoList todos={filteredTodos} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

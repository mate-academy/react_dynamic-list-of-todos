/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && !todo.completed) ||
      (filterStatus === 'completed' && todo.completed);

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={filterStatus}
                onStatusChange={setFilterStatus}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearSearch={() => setSearchQuery('')}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={filteredTodos} onSelect={setSelectedTodo} />
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        onClose={() => setSelectedTodo(null)}
      />
    </>
  );
};

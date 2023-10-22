/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((data) => {
        setFilteredTodos(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (status: string, query: string) => {
    let filtered = filteredTodos;

    if (status === 'completed') {
      filtered = filteredTodos.filter((todo) => todo.completed);
    } else if (status === 'active') {
      filtered = filteredTodos.filter((todo) => !todo.completed);
    }

    if (query) {
      filtered = filtered.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    setFilteredTodos(filtered);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={handleFilter} />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && filteredTodos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          loading={loading}
          onDelete={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};

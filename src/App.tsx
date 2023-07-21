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
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [sortBy, setSortBy] = useState('All');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleDeleteQuery = () => {
    setQuery('');
  };

  const handleChangeSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const visibleTodos = () => {
    let copyArrayTodos = [...todos];

    if (query.trim() !== '') {
      copyArrayTodos = copyArrayTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    switch (sortBy) {
      case 'active':
        return (copyArrayTodos.filter(todo => !todo.completed));

      case 'completed':
        return (copyArrayTodos.filter(todo => todo.completed));

      default:
        return copyArrayTodos;
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortBy={sortBy}
                query={query}
                onChangeQuery={handleChangeQuery}
                onDeleteQuery={handleDeleteQuery}
                onChangeSortBy={handleChangeSortBy}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading
                && (
                  <TodoList
                    todos={visibleTodos()}
                    onSelect={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        onDelete={() => setSelectedTodo(null)}
      />
    </>
  );
};

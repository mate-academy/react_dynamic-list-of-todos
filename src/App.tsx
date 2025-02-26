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
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getFilteredTodos = (todos: Todo[], filter: string, query: string) => {
    let copyTodos = [...todos];

    if (query.trim()) {
      const normalizedQuery = query.trim().toLowerCase();

      copyTodos = copyTodos.filter(todo =>
        todo.title.toLowerCase().includes(normalizedQuery),
      );
    }

    if (filter) {
      copyTodos = copyTodos.filter(todo => {
        switch (filter) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return true;
        }
      });
    }

    return copyTodos;
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      // eslint-disable-next-line no-console
      .catch(() => console.error('loading error'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilteredTodos(getFilteredTodos(todos, filter, query));
  }, [filter, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={filteredTodos}
                onSelect={setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} closeModal={setSelectedTodo} />
      )}
    </>
  );
};

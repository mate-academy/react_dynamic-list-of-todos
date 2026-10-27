/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { FilterType, TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getPosts } from './services/todos';
import { wait } from './utils/httpClient';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    wait(1000)
      .then(() => {
        return Promise.all([getPosts().then(setTodosFromServer)]);
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    return todosFromServer.filter(todo => {
      const matchesStatus =
        selectedFilter === 'all' ||
        (selectedFilter === 'active' && !todo.completed) ||
        (selectedFilter === 'completed' && todo.completed);

      const normalizedQuery = query.toLowerCase().trim();
      const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [query, selectedFilter, todosFromServer]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={selectedTodo}
                onSelectedTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal enterTodo={selectedTodo} onSelectedTodo={setSelectedTodo} />
      )}
    </>
  );
};

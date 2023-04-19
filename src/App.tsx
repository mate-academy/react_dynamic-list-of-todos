/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        return (`Error while loading: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleTodos = useMemo(() => {
    const formattedQuery = query.trim().toLowerCase();

    return todos.filter((todo) => {
      const formattedTitle = todo.title.toLowerCase();
      const isTitleMatched = formattedTitle.includes(formattedQuery);

      if (selectedFilter === 'all') {
        return isTitleMatched;
      }

      if (selectedFilter === 'active') {
        return isTitleMatched && !todo.completed;
      }

      if (selectedFilter === 'completed') {
        return isTitleMatched && todo.completed;
      }

      return false;
    });
  }, [todos, query, selectedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                query={query}
                setQuery={(queryText: string) => {
                  setQuery(queryText);
                }}
              />
            </div>

            <div className="block">
              {(loading === true)
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

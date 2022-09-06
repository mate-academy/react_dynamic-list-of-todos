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
  const [filteringBy, setFilteringBy] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedTodoID, setSelectedTodoID] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      const { title, completed } = todo;

      if (!title.includes(query.toLowerCase())) {
        return false;
      }

      return filteringBy === 'all'
        ? true
        : completed === (filteringBy === 'completed');
    })
  ), [todos, filteringBy, query]);

  const selectedTodo = useMemo(() => (
    visibleTodos.find(({ id }) => id === selectedTodoID) || null
  ), [visibleTodos, selectedTodoID]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteringBy={filteringBy}
                changeFiltering={setFilteringBy}
                query={query}
                changeQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoID={selectedTodoID}
                    onSelectedTodoID={setSelectedTodoID}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onCloseModal={setSelectedTodoID} />
      )}
    </>
  );
};

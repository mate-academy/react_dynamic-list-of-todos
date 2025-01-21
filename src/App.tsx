/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { FILTER_STATUS } from './utils/FILTER_STATUS';
import { getTodos } from './api';

import { Todo } from './types/Todo';

function handleFiltration(data: Todo[], query: string, filterBy: string) {
  let visibleData = [...data];

  if (filterBy) {
    switch (filterBy) {
      case FILTER_STATUS.ACTIVE:
        visibleData = [...data].filter(todo => !todo.completed);
        break;
      case FILTER_STATUS.COMPLETED:
        visibleData = [...data].filter(todo => todo.completed);
        break;
    }
  }

  if (query) {
    visibleData = visibleData.filter(todo => {
      const normalizedQuery = query.trim().toLowerCase();

      return todo.title.trim().toLowerCase().includes(normalizedQuery);
    });
  }

  return visibleData;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(FILTER_STATUS.ALL);
  const [query, setQuery] = useState('');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleData = handleFiltration(todos, query, filterBy);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterBy={setFilterBy}
                filterBy={filterBy}
                onQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}

              <TodoList
                todos={visibleData}
                onCurrentTodo={setCurrentTodo}
                currentTodo={currentTodo || null}
              />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && (
        <TodoModal currentTodo={currentTodo} onCurrentTodo={setCurrentTodo} />
      )}
    </>
  );
};

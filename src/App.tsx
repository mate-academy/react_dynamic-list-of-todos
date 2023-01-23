/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

enum SortType {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(data => (setTodosList(() => data)))
      .finally(() => setLoading(false));
  }, []);

  const getSelected = (allTodos: Todo[]): Todo[] => {
    return allTodos.filter(item => {
      switch (filter) {
        case SortType.ALL:
          return true;

        case SortType.COMPLETED:
          return item.completed === true;

        case SortType.ACTIVE:
          return item.completed === false;

        default: return true;
      }
    });
  };

  const visibleTodos = useMemo(() => {
    const selected = getSelected(todosList);

    return selected.filter(todo => todo.title.includes(searchQuery));
  }, [searchQuery, todosList, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                onSearch={setSearchQuery}
                filter={filter}
                toFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {todosList.length && (
                <TodoList todos={visibleTodos} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};

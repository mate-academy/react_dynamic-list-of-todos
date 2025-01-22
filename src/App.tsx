/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

function filteringTodos(
  array: Todo[],
  settings: { filterType: Filter; query: string },
) {
  let arrayCopy = [...array];

  if (settings.filterType === Filter.Active) {
    arrayCopy = arrayCopy.filter(element => element.completed === false);
  }

  if (settings.filterType === Filter.Completed) {
    arrayCopy = arrayCopy.filter(element => element.completed === true);
  }

  if (settings.query) {
    arrayCopy = arrayCopy.filter(element =>
      element.title
        .toLowerCase()
        .includes(settings.query.toLowerCase().trimStart()),
    );
  }

  return arrayCopy;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const handleResetQuery = () => {
    setQuery('');
  };

  const onTodoReset = (value: Todo | null) => {
    setSelectedTodo(value);
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    return filteringTodos(todos, { filterType, query });
  }, [todos, filterType, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter
                query={query}
                filterType={filterType}
                onFilter={setFilterType}
                onQuery={setQuery}
                onResetQuery={handleResetQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  onTodoSelect={setSelectedTodo}
                  onUserIdSelect={setSelectedUserId}
                  selectedTodo={selectedTodo}
                  todos={filteredTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onTodoReset={onTodoReset}
          selectedTodo={selectedTodo}
          selectedUserId={selectedUserId}
        />
      )}
    </>
  );
};

import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterType } from './types/FilterTypes';
import { preparedTodos } from './utils/FilterFunction';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [filterType, setFiltertype] = useState(FilterType.All);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const visibleTodos = useMemo(
    () => preparedTodos(todos, query, filterType),
    [todos, query, filterType],
  );

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch((error) => {
        throw new Error(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                changeQuery={setQuery}
                filterType={filterType}
                changeFilterType={setFiltertype}
              />
            </div>

            <div className="block">
              {loading
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
      {
        selectedTodo && (
          <TodoModal
            selectedTodo={selectedTodo}
            closeModelWindow={setSelectedTodo}
          />
        )
      }
    </>
  );
};

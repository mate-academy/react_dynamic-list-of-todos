/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
// eslint-disable-next-line import/no-cycle
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/enum';
import { getPreperadTodos } from './utils/utils';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredBy, setFilteredBy] = useState<string>(FilterType.All);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const vidibleTodos = getPreperadTodos(todos, filteredBy, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredBy={filteredBy}
                onFilteredBy={setFilteredBy}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading && !selectedTodo && (
                <Loader />
              )}

              {(!loading || (loading && selectedTodo)) && todos.length !== 0 && (
                <TodoList
                  todos={vidibleTodos}
                  onSelect={(todo) => setSelectedTodo(todo)}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          loading={loading}
          onLoading={setLoading}
          selectedTodo={selectedTodo}
          onSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

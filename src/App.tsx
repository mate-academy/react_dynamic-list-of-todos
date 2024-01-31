/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { FilterParams } from './types/FilterParams';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getFilteredTodos } from './getFilteredTodos/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    query: '',
    status: Status.All,
  });
  const filteredTodos = getFilteredTodos(todos, filterParams);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => new Error('Try again later'))
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
                filterParams={filterParams}
                setFilterParams={setFilterParams}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && filteredTodos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelect={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelect={setSelectedTodo}
        />
      )}
    </>
  );
};

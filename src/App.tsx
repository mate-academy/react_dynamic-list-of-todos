import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

const normalizeString = (str: string): string => str.toLowerCase().trim();

const filterTodos = (
  todos: Todo[],
  filterStatus: FilterStatus,
  query: string,
): Todo[] => {
  const queryNormalized = normalizeString(query);
  return todos
    .filter((todo: Todo) => {
      switch (filterStatus) {
        case FilterStatus.Active:
          return !todo.completed;
        case FilterStatus.Completed:
          return todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => normalizeString(todo.title).includes(queryNormalized));
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isloading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = useMemo(
    () => filterTodos(todos, filterStatus, query),
    [filterStatus, todos, query],
  );

  const handleClosedModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isloading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedIdTodo={selectedTodo?.id}
                  onSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal onClose={handleClosedModal} todo={selectedTodo} />
      )}
    </>
  );
};

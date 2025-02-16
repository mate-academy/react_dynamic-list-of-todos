/* eslint-disable max-len */
import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { useTodos } from './hooks/useTodos';

interface Criteria {
  filter: Filter;
  query: string;
}

function prepareTodos(todos: Todo[], { filter, query }: Criteria): Todo[] {
  let preparedTodos = [...todos];
  const normalizedQuery = query.trim().toLowerCase();

  if (filter !== Filter.All) {
    switch (filter) {
      case Filter.Active:
        preparedTodos = preparedTodos.filter(({ completed }) => !completed);
        break;
      case Filter.Completed:
        preparedTodos = preparedTodos.filter(({ completed }) => completed);
        break;
      default:
    }
  }

  if (normalizedQuery !== '') {
    preparedTodos = preparedTodos.filter(({ title }) =>
      title.toLowerCase().includes(normalizedQuery),
    );
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todos, loadingTodos] = useTodos();
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const preparedTodos = useMemo(
    () => prepareTodos(todos, { filter, query }),
    [todos, filter, query],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilter={setFilter}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {loadingTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onSelect={setSelectedTodo} />
      )}
    </>
  );
};

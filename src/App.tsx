/* eslint-disable max-len */
import { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterStatus.All);
  const [query, setQuery] = useState('');
  const [onTodo, setOnTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as FilterStatus);
  };

  const queryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const queryDelete = () => {
    setQuery('');
  };

  const preparedTodos = useMemo(() => {
    const filteredBy = (() => {
      switch (filter) {
        case FilterStatus.Completed:
          return todos.filter(todo => todo.completed);

        case FilterStatus.Active:
          return todos.filter(todo => !todo.completed);

        default:
          return todos;
      }
    })();

    return filteredBy.filter(todo => todo.title.toLowerCase().includes(query.trim().toLowerCase())) || [];
  }, [todos, filter, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterSelect={filterSelect}
                filterValue={filter}
                onQueryChange={queryChange}
                queryValue={query}
                onQueryDelete={queryDelete}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  onClickTodo={setOnTodo}
                  clickTodo={onTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {onTodo && (
        <TodoModal
          todo={onTodo}
          onCloseModal={() => setOnTodo(null)}
        />
      )}
    </>
  );
};

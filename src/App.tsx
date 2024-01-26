/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

interface FilterParams {
  filterBy: string,
  query: string,
}

function getFiltereredTodos(
  todos: Todo[],
  { filterBy, query }: FilterParams,
) {
  let filteredTodos = [...todos];
  const adaptedQuery = query.trim().toLowerCase();

  switch (filterBy) {
    case Filter.Active:
      filteredTodos = todos.filter((todo) => !todo.completed);
      break;

    case Filter.Completed:
      filteredTodos = todos.filter((todo) => todo.completed);
      break;

    default:
      break;
  }

  if (adaptedQuery) {
    return filteredTodos.filter((todo) => todo.title.toLowerCase().includes(adaptedQuery));
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = getFiltereredTodos(todos, { filterBy, query });

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
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
                filterOption={setFilterBy}
                query={query}
                setQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}

              {!loading && todos.length > 0 && (
                <TodoList
                  items={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

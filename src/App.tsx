import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { Filters } from './types/Filters';

function getVisibleTodos(
  allToDos: Todo[],
  {
    query,
    filter,
  }: {
    query: string;
    filter: Filters;
  },
) {
  let handledTodos = [...allToDos];

  if (query) {
    handledTodos = handledTodos.filter(todo =>
      todo.title.toLowerCase().includes(query),
    );
  }

  switch (filter) {
    case Filters.Active:
      handledTodos = handledTodos.filter(todo => !todo.completed);
      break;
    case Filters.Completed:
      handledTodos = handledTodos.filter(todo => todo.completed);
      break;
    default:
      return handledTodos;
  }

  return handledTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Filters.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        throw new Error('Could not fetch todos');
      })
      .finally(() => setLoading(false));
  }, []);

  const resetQuery = () => setQuery('');
  const resetSelectedTodo = () => setSelectedTodo(null);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filterBy={filterQuery => {
                  setFilter(filterQuery);
                }}
                sortBy={newQuery => {
                  setQuery(newQuery);
                }}
                onReset={resetQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  visibleTodos={getVisibleTodos(todos, { query, filter })}
                  onSelect={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} onReset={resetSelectedTodo} />
      )}
    </>
  );
};

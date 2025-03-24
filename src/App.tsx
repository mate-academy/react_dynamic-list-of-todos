/* eslint-disable max-len */
import React, { useMemo, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/filterBy';

function PrepareTodos(
  todos: Todo[],
  filterBy: FilterBy,
  searchQuery: string,
): Todo[] {
  let preparedTodos = [...todos];

  if (searchQuery) {
    const processedQuery = searchQuery.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo => {
      const processedTitle = todo.title.toLowerCase();

      return processedTitle.includes(processedQuery);
    });
  }

  if (filterBy !== FilterBy.All) {
    preparedTodos = preparedTodos.filter(todo => {
      switch (filterBy) {
        case FilterBy.Active:
          return !todo.completed;
        case FilterBy.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  return preparedTodos;
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(setTodosFromServer)
      .catch(() => setErrorMessage(`Error: can't load todos`))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(
    () => PrepareTodos(todosFromServer, filterBy, searchQuery),
    [todosFromServer, filterBy, searchQuery],
  );

  const handleSelectTodo = (todo: Todo) => setSelectedTodo(todo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                setSearchQuery={setSearchQuery}
                filterByValue={filterBy}
                searchQueryValue={searchQuery}
              />
            </div>

            <div className="block">
              {!errorMessage &&
                (isLoading ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    onSelect={todo => {
                      handleSelectTodo(todo);
                    }}
                  />
                ))}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
};

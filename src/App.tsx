import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBy } from './utils/enums';

function filterTodos(
  todos: Todo[],
  searchQuery: string,
  filterCriteria: FilterBy,
) {
  let filteredTodos = [...todos];

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();

    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }

  if (filterCriteria) {
    if (filterCriteria === FilterBy.Active) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }

    if (filterCriteria === FilterBy.Completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [filter, setFilter] = useState(FilterBy.All);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo>();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setQuery(event.target.value);

    setTimeout(() => {
      setAppliedQuery(event.target.value);
    }, 1000);
  };

  const handleClearInputButton = () => {
    setQuery('');
    setAppliedQuery('');
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then((todosFromServer) => {
        setVisibleTodos(filterTodos(todosFromServer, appliedQuery, filter));
      })
      .finally(() => setLoading(false));
  }, [filter, appliedQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={setFilter}
                onQueryChange={handleInputChange}
                query={query}
                onClear={handleClearInputButton}
              />
            </div>

            <div className="block">

              {loading && (
                <Loader />
              )}

              {!loading && visibleTodos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  todoSelected={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onSelect={setSelectedTodo}
          todoSelected={selectedTodo}
        />
      )}
    </>
  );
};

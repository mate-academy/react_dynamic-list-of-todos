/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

type FilterParams = {
  filterBy: string;
  query: string;
};

function getFilteredTodos(todos: Todo[], { filterBy, query }: FilterParams) {
  let filteredTodos = [...todos];
  const preparedQuery = query.trim().toLocaleLowerCase();

  switch (filterBy) {
    case 'active':
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = todos.filter(todo => todo.completed);
      break;
  }

  if (preparedQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(preparedQuery),
    );
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [filterBy, setFilterBy] = useState('all');
  const [query, setQuery] = useState('');

  const filteredTodos = getFilteredTodos(todos, { filterBy, query });

  useEffect(() => {

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const clearSearchInput = () => {
    setQuery('');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                search={query}
                handleSearch={handleSearchChange}
                filter={handleFilterChange}
                clearSearchInput={clearSearchInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={filteredTodos}
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

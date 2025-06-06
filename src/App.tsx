import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [allTodos, setAllTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const [selectedTodo, setSelectedTodo] = React.useState<Todo | null>(null);

  const getFilteredTodos = () => {
    let filtered = allTodos;

    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (search) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return filtered;
  };

  const handleSearchChange = (searchValue: string): void => {
    setSearch(searchValue);
  };

  const handleFilterChange = (filterValue: string): void => {
    setFilter(filterValue);
  };

  const handleClearSearch = (): void => {
    setSearch('');
    setFilter('all');
  };

  const handleTodoClick = (todo: Todo): void => {
    setSelectedTodo(todo);
  };

  useEffect(() => {
    getTodos()
      .then(setAllTodos)
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
                handleFilter={handleFilterChange}
                handleChange={handleSearchChange}
                handleClear={handleClearSearch}
                searchValue={search}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getFilteredTodos()}
                  onTodoClick={handleTodoClick}
                  selectedTodo={selectedTodo}
                />
              )}
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

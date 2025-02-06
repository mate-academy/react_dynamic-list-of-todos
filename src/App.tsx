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
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    const filtered = todos.filter(todo => {
      const matchesFilter =
        filter === FilterType.All ||
        (filter === FilterType.Active && !todo.completed) ||
        (filter === FilterType.Completed && todo.completed);

      const matchesSearch = todo.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });

    setFilteredTodos(filtered);
  }, [todos, filter, search]);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const resetSelectTodo = () => {
    setSelectedTodo(null);
  };

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterChange={handleFilterChange}
                searchChange={handleSearchChange}
              />
            </div>

            <div className="block">
              {!isLoaded && <Loader />}

              {isLoaded && todos.length > 0 && (
                <TodoList
                  todos={filteredTodos}
                  onSelectTodo={handleSelectTodo}
                  currentTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo ? (
        <TodoModal todo={selectedTodo} resetTodo={resetSelectTodo} />
      ) : null}
    </>
  );
};

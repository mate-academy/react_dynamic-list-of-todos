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
import { FilterType } from './types/Filter';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [search, setSearch] = useState<string>('');

  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

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
    setSelectTodo(todo);
  };

  const resetSelectedTodo = () => {
    setSelectTodo(null);
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
              {todos.length !== 0 && (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectTodo ? (
        <TodoModal todo={selectTodo} resetTodo={resetSelectedTodo} />
      ) : null}
    </>
  );
};

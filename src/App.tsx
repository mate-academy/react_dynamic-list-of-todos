/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>(FilterType.All);
  const [query, setQuery] = useState<string>('');
  const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(setOriginalTodos);
  }, []);

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [todosQuery, setTodosQuery] = useState<Todo[]>([]);

  const handleFilter = () => {
    switch (filter) {
      case FilterType.Completed:
        setFilteredTodos(originalTodos.filter(todo => todo.completed));

        break;
      case FilterType.Active:
        setFilteredTodos(originalTodos.filter(todo => !todo.completed));

        break;
      default:
        setFilteredTodos(originalTodos);

        break;
    }
  };

  useEffect(() => {
    handleFilter();
    setTodosQuery(filteredTodos);
  }, [filter, query]);

  useEffect(() => {
    setTodosQuery(
      filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLocaleLowerCase()),
      ),
    );
  }, [query, filteredTodos]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              setFilter={setFilter}
              setQuery={setQuery}
              query={query}
            />
          </div>

          <div className="block">
            {originalTodos.length === 0 ? (
              <Loader />
            ) : (
              <TodoList
                todos={
                  todosQuery.length > 0 || query ? todosQuery : originalTodos
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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

enum Selected {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [visibleTodo, setVisibleTodo] = useState(false);
  const [selectFilter, setSelectFilter] = useState<Selected>(Selected.All);
  const [query, setQuery] = useState('');
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  const handleSelectedTodo = (todo: Todo) => {
    if (todo) {
      setSelectTodo(todo);
    }

    setVisibleTodo(true);
  };

  const handleSelectTodoClose = () => {
    setSelectTodo(null);
    setVisibleTodo(false);
  };

  useEffect(() => {
    const loadTodo = async () => {
      try {
        setLoader(true);
        const todosRew = await getTodos();

        setTodos(todosRew);
      } catch (e) {
      } finally {
        setLoader(false);
      }
    };

    loadTodo();
  }, []);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    const matchesStatus = (() => {
      switch (selectFilter) {
        case Selected.Completed:
          return todo.completed;
        case Selected.Active:
          return !todo.completed;
        case Selected.All:
        default:
          return true;
      }
    })();

    return matchesQuery && matchesStatus;
  });

  const handleFilterChange = (newFilter: string) => {
    setSelectFilter(newFilter as Selected);
  };

  const handleQueryChange = (newQuery: string) => setQuery(newQuery);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={handleFilterChange}
                query={query}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectTodoId={selectTodo}
                  onTodoSelect={handleSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {visibleTodo && (
        <TodoModal todo={selectTodo} selectTodoClose={handleSelectTodoClose} />
      )}
    </>
  );
};

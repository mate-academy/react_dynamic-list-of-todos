/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter, Filter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [allToDos, setAllToDos] = useState<Todo[]>([]);
  const [visibleToDos, setVisibleToDos] = useState<Todo[]>([]);
  const [isToDosLoading, setIsToDosLoading] = useState(false);
  const [filterMode, setFilterMode] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selectedToDo, setSelectedToDo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsToDosLoading(true);

    getTodos()
      .then(todos => {
        setAllToDos(todos);
        setVisibleToDos(todos);
      })
      .finally(() => setIsToDosLoading(false));
  }, []);

  useEffect(() => {
    if (allToDos.length === 0) {
      return;
    }

    const filteredTodos = allToDos.filter(todo => {
      const matchesStatus =
        filterMode === 'all' ||
        (filterMode === 'completed' && todo.completed) ||
        (filterMode === 'active' && !todo.completed);

      const matchesQuery = todo.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });

    setVisibleToDos(filteredTodos);
  }, [allToDos, query, filterMode]);

  function handleChange(option: Filter) {
    setFilterMode(option);
  }

  function handleQueryChange(newQuery: string) {
    setQuery(newQuery);
  }

  function handleSelectedTodo(todo: Todo) {
    setSelectedToDo(todo);
  }

  function clearQuery() {
    setQuery('');
  }

  function clearSelectedToDo() {
    setSelectedToDo(null);
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChange={handleChange}
                onQueryChange={handleQueryChange}
                onClearQuery={clearQuery}
              />
            </div>

            <div className="block">
              {isToDosLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleToDos}
                  onSelectedToDo={handleSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TodoModal todo={selectedToDo} onClear={clearSelectedToDo} />
    </>
  );
};

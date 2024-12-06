/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [selected, setSelected] = useState<Todo | null>(null);
  const [toDoList, setToDoList] = useState<Todo[]>([]);
  const [isLoadingTodosList, setIsLoadingTodosList] = useState(true);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoadingTodosList(true);
    getTodos()
      .then(setToDoList)
      .finally(() => setIsLoadingTodosList(false));
  }, []);

  function preparedToDoList(
    list: Todo[],
    filterType: string,
    searchQuery: string,
  ): Todo[] {
    const copyList = [...list];
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredByQuery = normalizedQuery
      ? copyList.filter(todo => todo.title.toLowerCase().includes(normalizedQuery))
      : copyList;

    switch (filterType) {
      case FilterType.Active:
        return filteredByQuery.filter(todo => !todo.completed);
      case FilterType.Completed:
        return filteredByQuery.filter(todo => todo.completed);
      case FilterType.All:
      default:
        return filteredByQuery;
    }
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                onFilter={setFilter}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodosList ? (
                <Loader />
              ) : (
                <TodoList
                  selected={selected}
                  onSelected={setSelected}
                  todos={preparedToDoList(toDoList, filter, query)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {!!selected && <TodoModal selected={selected} onSelected={setSelected} />}
    </>
  );
};

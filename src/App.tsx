/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { useFetch } from './hooks/useFetch';
import { ErrorModal } from './components/ErrorModal';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const { dataCollection, isLoading, error } = useFetch<Todo[]>(getTodos);

  const filterTodosByActiveFilter = () => {
    // eslint-disable-next-line no-console
    console.log('filterTodosByActiveFilter');
    if (dataCollection) {
      switch (activeFilter) {
        case 'completed':
          return dataCollection?.filter(todo => todo.completed);
        case 'active':
          return dataCollection?.filter(todo => !todo.completed);
        case 'all':
        default:
          return dataCollection;
      }
    } else {
      return [];
    }
  };

  const filterTodosByQuery = (todoList: Todo[]) => {
    return todoList.filter(todo => todo.title.toUpperCase().includes(query.toUpperCase()));
  };

  const filteredTodosByActiveFilter = filterTodosByActiveFilter();
  const visibleTodos = filterTodosByQuery(filteredTodosByActiveFilter);

  if (error) {
    return (
      <ErrorModal error={error.message} />
    );
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQueryChange={setQuery}
                onFilterChange={setActiveFilter}
                query={query}
                filter={activeFilter}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={visibleTodos}
                onSelectingTodo={setSelectedTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal selectedTodo={selectedTodo} onModalClose={setSelectedTodo} />}
    </>
  );
};

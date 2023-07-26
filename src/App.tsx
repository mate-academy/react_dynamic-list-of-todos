import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState(FilterBy.ALL);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((error) => {
        throw new Error(error.message);
      }).finally(() => setIsLoading(false));
  }, []);

  const getFilteredTodos = (
    todosList: Todo[],
    searchQuery: string,
    filter: FilterBy,
  ) => {
    const isSearchNotEmpty = searchQuery.trim();

    const filteredTodos = isSearchNotEmpty
      ? todosList.filter((todo) => {
        const lowerCaseTitle = todo.title.toLowerCase();
        const lowerCaseSearchQuery = searchQuery.toLowerCase();

        return lowerCaseTitle.includes(lowerCaseSearchQuery);
      })
      : todosList;

    if (filter === FilterBy.COMPLETED) {
      return filteredTodos.filter((todo) => todo.completed);
    }

    if (filter === FilterBy.ACTIVE) {
      return filteredTodos.filter((todo) => !todo.completed);
    }

    return filteredTodos;
  };

  const visibleTodos = useMemo(
    () => getFilteredTodos(todos, query, filterStatus),
    [todos, query, filterStatus],
  );

  const selectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const closeTodoModal = () => {
    setSelectedTodo(null);
  };

  const searchQueryUpdate = (value: string) => {
    setQuery(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                searchQueryUpdate={searchQueryUpdate}
                setFilterStatus={setFilterStatus}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onSelectTodo={selectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onCloseTodoModal={closeTodoModal} />
      )}
    </>
  );
};

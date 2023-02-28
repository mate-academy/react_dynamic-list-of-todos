/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { FilterBy } from './types/filter';

const filteredTodos = (todos: Todo[], query: string, filterBy: FilterBy) => {
  let preparedTodos = [...todos];

  if (query) {
    const preparedQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(preparedQuery));
  }

  switch (filterBy) {
    case FilterBy.ACTIVE:
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
      break;
    case FilterBy.COMPLETED:
      preparedTodos = preparedTodos.filter(todo => todo.completed);
      break;
    case FilterBy.ALL:
    default:
      break;
  }

  return preparedTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const visibleTodos = filteredTodos(todos, query, filterBy);

  const fetchData = async () => {
    setIsDataLoading(false);
    try {
      const data = await getTodos();

      setTodos(data);
    } catch (error) {
      setIsLoadingError(true);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const closeTodo = useCallback(() => {
    setSelectedTodo(null);
  }, [selectedTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onQueryChange={setQuery}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isDataLoading && <Loader />}
              {isLoadingError
                ? <p>Error, server is unavailable</p>
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodo={selectedTodo}
                    showTodo={showTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          closeTodo={closeTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};

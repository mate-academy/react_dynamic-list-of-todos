/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/Filters';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(response => setTodos(response))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const filteredTodos = useMemo(() => {
    let result = todos;

    switch (filterBy) {
      case FilterBy.ACTIVE:
        result = result.filter(todo => !todo.completed);
        break;
      case FilterBy.COMPLETED:
        result = result.filter(todo => todo.completed);
        break;
      default:
        break;
    }

    if (query.trim()) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return result;
  }, [todos, filterBy, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
                filterBy={filterBy}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  setSelectedTodo={handleSelectTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

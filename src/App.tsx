/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilteredBy } from './types/Filter';
import { getTodos } from './api';

const getVisibleTodos = (
  todos: Todo[],
  query: string,
  filterBy: FilteredBy,
) => {
  const visibleTodos = filterBy !== FilteredBy.ALL
    ? todos.filter(todo => {
      if (filterBy === FilteredBy.COMPLETED) {
        return todo.completed;
      }

      return !todo.completed;
    })
    : todos;

  if (query) {
    const readyQuery = query.toLowerCase().trim();

    return (
      visibleTodos.filter(todo => todo.title.toLowerCase().includes(readyQuery))
    );
  }

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilteredBy>(FilteredBy.ALL);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const visibleTodos = getVisibleTodos(todos, query, filterBy);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        const data = await getTodos();

        setTodos(data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    loadTodos().finally(() => {
      setIsLoading(false);
    });
  }, []);

  const showTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  const hideTodo = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                onChangeQuery={setQuery}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {isError ? (
                <p className="has-danger-text">
                  Error: Service is Unavailable
                </p>
              ) : (
                <TodoList
                  todos={visibleTodos}
                  showTodo={showTodo}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          hideTodo={hideTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};

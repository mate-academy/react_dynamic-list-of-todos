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

const filteredTodos = (todos: Todo[], query: string, filterBy: FilteredBy) => {
  const readyQuery = query ? query.toLowerCase().trim() : '';

  const readyTodos = todos.filter(todo => {
    const todoTitle = todo.title.toLowerCase().trim();
    const isTitleMatched = todoTitle.includes(readyQuery);
    const isActiveFilter = filterBy === FilteredBy.ACTIVE && !todo.completed;
    const isCompletedFilter = filterBy === FilteredBy.COMPLETED
        && todo.completed;
    const isAllFilter = filterBy === FilteredBy.ALL;

    return (
      isTitleMatched
      && (isActiveFilter
        || isCompletedFilter
        || isAllFilter
      )
    );
  });

  return readyTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilteredBy>(FilteredBy.ALL);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const getVisibleTodos = filteredTodos(todos, query, filterBy);

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
                  todos={getVisibleTodos}
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

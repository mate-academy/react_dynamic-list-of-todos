/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/Filter';

const getFilteredTodos = (todos: Todo[], query: string, filterBy: FilterBy) => {
  let newTodos = [...todos];

  if (query) {
    const newQuery = query.toLowerCase().trim();

    newTodos = newTodos.filter(todo => todo.title.toLowerCase().includes(newQuery));
  }

  switch (filterBy) {
    case FilterBy.ACTIVE:
      newTodos = newTodos.filter(todo => !todo.completed);
      break;
    case FilterBy.COMPLETED:
      newTodos = newTodos.filter(todo => todo.completed);
      break;
    case FilterBy.ALL:
    default:
      break;
  }

  return newTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);

  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(false);

  const getTodosServer = async () => {
    try {
      const arrayTodos = await getTodos();

      setTodos(arrayTodos);
      setisLoading(false);
      setError(false);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    getTodosServer();
  }, []);

  const visibleTodos = getFilteredTodos(todos, query, filterBy);

  const closeTodo = useCallback(() => {
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
                setQuery={setQuery}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {error
                ? <p>Error, server is unavailable</p>
                : (
                  <TodoList
                    todos={visibleTodos}
                    showTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
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

/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useMemo(() => {
    getTodos().then(setTodos);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (todos) {
        setIsLoading(false);
      }
    }, 1000);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    let currentTodos = todos;

    switch (filter) {
      case Filter.Completed:
        currentTodos = currentTodos.filter(todo => todo.completed);
        break;

      case Filter.Active:
        currentTodos = currentTodos.filter(todo => !todo.completed);
        break;

      default:
        break;
    }

    currentTodos = currentTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );

    return currentTodos;
  }, [todos, filter, query]);

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
                filter={filter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                  todos={visibleTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};

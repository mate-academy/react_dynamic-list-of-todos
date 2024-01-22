/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const filteredTodos: Todo[] = useMemo(() => {
    let preparedTodos = [...todos];

    if (filter !== Filter.ALL) {
      preparedTodos = preparedTodos.filter(todo => {
        switch (filter) {
          case Filter.ACTIVE:
            return !todo.completed;

          case Filter.COMPLETED:
            return todo.completed;

          default:
            return true;
        }
      });
    }

    if (query.trim()) {
      preparedTodos = preparedTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return preparedTodos;
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
                filter={filter}
                setFilter={setFilter}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  onSelect={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          closeModal={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};

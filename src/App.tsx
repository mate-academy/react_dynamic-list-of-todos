/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.All);

  const preparedTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return todos
      .filter(todo => {
        switch (filterBy) {
          case Filter.Active:
            return !todo.completed;

          case Filter.Completed:
            return todo.completed;

          default:
            return todo;
        }
      })
      .filter(todo =>
        todo.title.toLowerCase().trim().includes(normalizedQuery),
      );
  }, [filterBy, todos, query]);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && todos.length > 0 && (
                <TodoList
                  todos={preparedTodos}
                  showSelectedTodo={setSelectedTodo}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onReset={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
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
  const [todoLoading, setTodoLoading] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState<string>('');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.All:
        return todo;
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return todo;
    }
  })
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setTodoLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setTodoLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {todoLoading && (
                <Loader />
              )}

              {!todoLoading && !!todos.length && (
                <TodoList
                  todos={filteredTodos}
                  activeTodo={activeTodo}
                  setActiveTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal
          activeTodo={activeTodo}
          setActiveTodo={setActiveTodo}
        />
      )}
    </>
  );
};

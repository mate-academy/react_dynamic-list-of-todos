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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, selectTodo] = useState<Todo | null>(null);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.all);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const getVisibleTodos = () => {
    switch (filter) {
      case Filter.active:
        return todos.filter(todo => !todo.completed && todo.title
          .toLowerCase()
          .includes(query.toLowerCase()));

      case Filter.completed:
        return todos.filter(todo => todo.completed && todo.title
          .toLowerCase()
          .includes(query.toLowerCase()));

      default:
        return todos.filter(todo => todo.title
          .toLowerCase()
          .includes(query.toLowerCase()));
    }
  };

  const visibleTodos = useMemo(getVisibleTodos, [todos, query, filter]);

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
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    selectTodo={selectTodo}
                    selectedTodo={selectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo !== null && (
        <TodoModal
          closeTodoModalHandler={() => selectTodo(null)}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};

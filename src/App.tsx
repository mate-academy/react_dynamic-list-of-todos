/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<Todo[]>(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(todo => {
        setFilterTodos(todo);
        setTodos(todo);
      });
  }, []);

  const getFilteredTodos = (list: string) => {
    const completed = todos.filter(todo => todo.completed === false);
    const active = todos.filter(todo => todo.completed === true);

    switch (list) {
      case 'active':
        return setFilterTodos(active);

      case 'completed':
        return setFilterTodos(completed);

      default:
        return setFilterTodos(todos);
    }
  };

  function includesQuery(value: string) {
    const uppQuery = query.toUpperCase();

    return value.toUpperCase().includes(uppQuery);
  }

  const visibleTodos = () => {
    const filtered = [...todos].filter(todo => {
      return includesQuery(todo.title);
    });

    return setFilterTodos(filtered);
  };

  useEffect(() => {
    visibleTodos();
  }, [query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredTodos={getFilteredTodos}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              { !todos.length ? (
                <Loader />
              )
                : (
                  <TodoList
                    filterTodos={filterTodos}
                    setSelectedTodo={setSelectedTodo}
                    selectedTodo={selectedTodo}
                  />
                )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onClose={() => setSelectedTodo(null)}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};

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
  const [filter, setFilter] = useState('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | undefined>(undefined);
  const [query, setQuery] = useState('');
  const [loadingTodos, setLoadingTodos] = useState(true);

  useEffect(() => {
    setLoadingTodos(true);

    switch (filter) {
      case 'all':
        getTodos()
          .then(allTodos =>
            allTodos.filter(todo =>
              todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          )
          .then(setTodos)
          .finally(() => setLoadingTodos(false));
        break;
      case 'active':
        getTodos()
          .then(allTodos =>
            allTodos.filter(
              todo =>
                !todo.completed &&
                todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          )
          .then(setTodos)
          .finally(() => setLoadingTodos(false));
        break;
      case 'completed':
        getTodos()
          .then(allTodos =>
            allTodos.filter(
              todo =>
                todo.completed &&
                todo.title.toLowerCase().includes(query.toLowerCase()),
            ),
          )
          .then(setTodos)
          .finally(() => setLoadingTodos(false));
        break;
      default:
        setTodos([]);
        setLoadingTodos(false);
        break;
    }
  }, [filter, query]);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleModalOpen = (activeTodoItem: Todo | undefined) => {
    setActiveTodo(activeTodoItem);
  };

  const handleModalClose = () => {
    setActiveTodo(undefined);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeFilter={handleFilter}
                query={query}
                clearQuery={() => setQuery('')}
                changeQuery={handleQueryChange}
              />
            </div>

            <div className="block">
              {loadingTodos && <Loader />}
              <TodoList
                todos={todos}
                activeTodo={activeTodo}
                openAction={handleModalOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {activeTodo && (
        <TodoModal todo={activeTodo} closeModal={handleModalClose} />
      )}
    </>
  );
};

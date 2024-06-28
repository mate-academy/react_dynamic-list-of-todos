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
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);

  useEffect(() => {
    setIsLoadingTodos(true);
    getTodos()
      .then(setTodosFromServer)
      .finally(() => setIsLoadingTodos(false));
  }, []);

  useEffect(() => {
    const filteredByQuery = todosFromServer.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    switch (filter) {
      case Filter.All:
        setTodos(filteredByQuery);
        break;
      case Filter.Active:
        setTodos(filteredByQuery.filter(todo => !todo.completed));
        break;
      case Filter.Completed:
        setTodos(filteredByQuery.filter(todo => todo.completed));
        break;
      default:
        setTodos([]);
        break;
    }
  }, [filter, query, todosFromServer]);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Filter);
  };

  const handleModalClose = () => {
    setActiveTodo(null);
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
                changeQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoadingTodos && <Loader />}
              <TodoList
                todos={todos}
                activeTodo={activeTodo}
                openAction={setActiveTodo}
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

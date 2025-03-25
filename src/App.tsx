/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [loader, setLoader] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoader(true);
    getTodos()
      .then(setTodos)
      .then(() => setLoader(false));
  }, []);

  const visibleTodos = useMemo(() => {
    let filteredTodos = todos;

    if (searchQuery.trim()) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      );
    }

    filteredTodos = filteredTodos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        case 'all':
          return true;
      }
    });

    return filteredTodos;
  }, [todos, searchQuery, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeFilter={setFilter}
                searchQuery={searchQuery}
                changeSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {visibleTodos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  activeTodo={activeTodo}
                  setTodo={setActiveTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {activeTodo && <TodoModal todo={activeTodo} setTodo={setActiveTodo} />}
    </>
  );
};

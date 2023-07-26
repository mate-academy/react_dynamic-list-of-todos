/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const todoByDefault: Todo = {
    userId: 0,
    id: 0,
    title: '',
    completed: false,
  };

  const [todo, setTodo] = useState(todoByDefault);
  const [query, setQuery] = useState('');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Title</h1>

            <div className="block">
              <TodoFilter
                query={query}
                setQuery={setQuery}
                setFilterBy={setFilterBy}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                setTodo={setTodo}
                query={query}
                filterBy={filterBy}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {todo.id && (
        <TodoModal
          todo={todo}
          setTodo={setTodo}
        />
      )}
    </>
  );
};

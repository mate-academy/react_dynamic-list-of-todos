/* eslint-disable max-len */
import React, { useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { useState } from 'react';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [todo, setTodos] = useState<Todo[]>([]);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoader(false));
  }, []);

  const filterTodos = todo
    .filter(t => {
      if (filter === 'completed') {
        return t.completed;
      }

      if (filter === 'active') {
        return !t.completed;
      }

      return true;
    })
    .filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilter={setFilter}
                query={query}
                onQuery={setQuery}
              />
            </div>

            <div className="block">
              {loader && <Loader />}
              {todo.length > 0 && (
                <TodoList
                  todos={filterTodos}
                  onSelect={setSelectTodo}
                  selectedTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal todo={selectTodo} onClose={() => setSelectTodo(null)} />
      )}
    </>
  );
};

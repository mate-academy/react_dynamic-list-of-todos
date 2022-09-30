/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

function prepareTodos(
  todos:Todo[],
  sortText: string,
  sortFilter:string,
) {
  return todos.filter(todo => todo.title.toLowerCase().includes(sortText.toLowerCase()))
    .filter(todo => {
      switch (sortFilter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoader, setLoader] = useState(false);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);
  const [sortFilter, setSortFilter] = useState('all');
  const [sortText, setSortText] = useState('');

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response);
      })
      .finally(() => {
        setLoader(true);
      });
  }, []);

  const visibelTodos:Todo[] = useMemo(() => (
    prepareTodos(
      todos,
      sortText,
      sortFilter,
    )
  ), [todos, sortText, sortFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSortFilter={setSortFilter}
                sortFilter={sortFilter}
                setSortText={setSortText}
                sortText={sortText}
              />
            </div>

            <div className="block">
              {isLoader
                ? (
                  <TodoList
                    visibelTodos={visibelTodos}
                    activeTodo={activeTodo}
                    setActiveTodo={setActiveTodo}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>
      {activeTodo !== null
        && (
          <TodoModal
            activeTodo={activeTodo}
            setActiveTodo={setActiveTodo}
          />
        )}
    </>
  );
};

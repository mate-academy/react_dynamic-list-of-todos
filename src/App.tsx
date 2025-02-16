/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [openedTodo, setOpenedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [list, setList] = useState<Todo[]>([]);

  const reset = () => {
    setOpenedTodo(null);
  };

  useEffect(() => {
    const fetchedTodos = async () => {
      setTimerIsActive(true);
      const todos = await getTodos();

      setList(todos);
      setTimerIsActive(false);
    };

    fetchedTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setSearch={setSearch}
                search={search}
              />
            </div>

            <div className="block">
              {timerIsActive && <Loader />}
              {!timerIsActive && (
                <TodoList
                  openedTodo={openedTodo}
                  setOpenedTodo={setOpenedTodo}
                  filter={filter}
                  search={search}
                  standartList={list}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {openedTodo && <TodoModal todo={openedTodo} reset={reset} />}
    </>
  );
};

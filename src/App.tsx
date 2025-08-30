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

type SortFilter = {
  select: string;
  textSearch: string;
};

export const App: React.FC = () => {
  const [load, setLoad] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortFilter, setSortFilter] = useState<SortFilter>({
    select: 'all',
    textSearch: '',
  });
  const [selectTodo, setSelectTodo] = useState<Todo>();

  const preparedTodos = useMemo((): Todo[] => {
    return todos.filter(todo => {
      const matchesText = todo.title
        .toLowerCase()
        .includes(sortFilter.textSearch.toLowerCase());

      let matchesStatus = true;

      if (sortFilter.select === 'active') {
        matchesStatus = !todo.completed;
      } else if (sortFilter.select === 'completed') {
        matchesStatus = todo.completed;
      }

      return matchesText && matchesStatus;
    });
  }, [todos, sortFilter]);

  useEffect(() => {
    getTodos()
      .then(resp => {
        setTodos(resp);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

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
              />
            </div>

            <div className="block">
              {load ? (
                <Loader />
              ) : (
                <TodoList
                  todos={preparedTodos}
                  setModalIsOpen={setModalIsOpen}
                  setSelectTodo={setSelectTodo}
                    modalIsOpen={modalIsOpen}
                     selectTodo={selectTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalIsOpen && (
        <TodoModal setModalIsOpen={setModalIsOpen} selectTodo={selectTodo} />
      )}
    </>
  );
};

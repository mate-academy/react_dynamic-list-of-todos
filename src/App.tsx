/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Filter } from './enum/Filter';

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [inputQuery, setInputQuery] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalTodo, setModalTodo] = useState<Todo | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos().then(setTodo)
      .finally(() => setIsLoading(false));
  }, []);

  const filterTodos = useMemo(() => {
    const newTodo = [...todos].filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    return newTodo;
  },[filter, todos]);

  const handleInput = useMemo(() => {
    const newTodo = filterTodos
      .filter(todo => todo.title.toLowerCase().includes(inputQuery.toLowerCase()));

    return newTodo
  }, [filterTodos, inputQuery]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setInputQuery={setInputQuery}
                inputQuery={inputQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                todos={handleInput}
                modalTodo={modalTodo}
                setModalTodo={setModalTodo}
                setIsModalActive={setIsModalActive}
              />
            </div>
          </div>
        </div>
      </div>
      {isModalActive && modalTodo &&
        (<TodoModal
          setModalTodo={setModalTodo}
          modalTodo={modalTodo}
          setIsModalActive={setIsModalActive}
        />
      )}
    </>
  );
};

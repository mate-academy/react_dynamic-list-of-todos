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

enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [handleFilter, setHandleFilter] = useState('');
  const [filterInput, setFilterInput] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [modalTodo, setModalTodo] = useState<Todo>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos().then(setTodo)
      .finally(() => setLoading(false));
  }, []);

  const filterTodos = () => {
    const newTodo = [...todos].filter(todo => {
      switch (handleFilter) {
        case Filter.Active:
          return todo.completed === false;
        case Filter.Completed:
          return todo.completed === true;
        default:
          return todo;
      }
    });

    return newTodo;
  };

  const handleInput = () => {
    const newTodo = filterTodos()
      .filter(todo => todo.title.toLowerCase().includes(filterInput.toLowerCase()));

    return newTodo;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilters={setHandleFilter}
                setFilterInput={setFilterInput}
                filterInput={filterInput}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={handleInput()}
                setModalTodo={setModalTodo}
                setModalActive={setModalActive}
              />
            </div>
          </div>
        </div>
      </div>
      {modalActive && modalTodo
       && (
         <TodoModal
           modalTodo={modalTodo}
           setModalActive={setModalActive}
         />
       )}
    </>
  );
};

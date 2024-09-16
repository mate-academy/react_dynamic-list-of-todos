/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [searchFilter, setSeacrhFilter] = useState('');
  const [completedSearch, setCompletedSearch] = useState('all');
  const [modalId, setModalId] = useState<undefined | number>(undefined);

  const handleLoadTodos = () => {
    setLoader(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .then(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    handleLoadTodos();
  }, []);

  const visibleTodos = () => {
    let visTodos = todos;

    if (searchFilter.toLowerCase().length !== 0) {
      visTodos = visTodos.filter(todo =>
        todo.title.includes(searchFilter.toLowerCase()),
      );
    }

    if (completedSearch !== 'all') {
      if (completedSearch === 'completed') {
        visTodos = visTodos.filter(todo => todo.completed === true);
      }

      if (completedSearch === 'active') {
        visTodos = visTodos.filter(todo => todo.completed === false);
      }
    }

    return visTodos;
  };

  const modalTodo = todos.filter(todo => todo.id === modalId)[0];

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchFilter={searchFilter}
                setSearchFilter={setSeacrhFilter}
                completedSearch={completedSearch}
                setCompletedSearch={setCompletedSearch}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos()}
                  searchFilter={searchFilter}
                  modalId={modalId}
                  setModalId={setModalId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalId !== undefined && (
        <TodoModal setModalId={setModalId} mainTodo={modalTodo} />
      )}
    </>
  );
};

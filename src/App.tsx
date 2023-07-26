/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [modalView, setModalView] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setTodos={setFilteredTodos}
              />
            </div>

            <div className="block">
              {loading ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    modalView={modalView}
                    setModalView={setModalView}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalView
        ? (
          <TodoModal
            filteredTodos={filteredTodos}
            modalView={modalView}
            setModalView={setModalView}
          />
        )
        : null}
    </>
  );
};

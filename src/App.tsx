/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [filterBy, setFilterBy] = useState('');
  const [filterBySelect, setFilterBySelect] = useState('all');
  const [modalShowId, setModalShowId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(todosData => {
        setTodos(todosData);
        setLoading(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Ошибка при загрузке задач:', error);
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
                filterBy={filterBy}
                setFilterBy={setFilterBy}
                filterBySelect={filterBySelect}
                setFilterBySelect={setFilterBySelect}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  modalShowId={modalShowId}
                  filterBy={filterBy}
                  filterBySelect={filterBySelect}
                  setModalShowId={setModalShowId}
                  todos={todos}
                  setTodos={setTodos}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modalShowId !== 0 && (
        <TodoModal
          modalShowId={modalShowId}
          setModalShowId={setModalShowId}
          todos={todos}
        />
      )}
    </>
  );
};

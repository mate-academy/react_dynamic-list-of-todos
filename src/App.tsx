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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selected, setSelected] = useState('all');
  const [search, setSearch] = useState('');
  const [listLoading, setListLoading] = useState(false);
  const [modal, setModal] = useState<Todo | null>(null);

  useEffect(() => {
    setListLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setListLoading(false));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      if (selected === 'completed') {
        return todo.completed === true;
      }

      if (selected === 'active') {
        return todo.completed === false;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(search.trim()));

  const onCloseModal = () => {
    setModal(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selected={selected}
                setSelected={setSelected}
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="block">
              {listLoading && <Loader />}
              <TodoList
                modal={modal}
                setModal={setModal}
                todos={filteredTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {modal && <TodoModal modal={modal} onCloseModal={onCloseModal} />}
    </>
  );
};

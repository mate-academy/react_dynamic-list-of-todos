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

function prepareList(list: Todo[], status: string, query: string) {
  let statusList: Todo[] = [];

  if (status === 'all') {
    statusList = [...list];
  } else if (status === 'completed') {
    statusList = [...list].filter(a => a.completed === true);
  } else if (status === 'active') {
    statusList = [...list].filter(a => a.completed === false);
  } else {
    statusList = [];
  }

  const preparedList = statusList.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()),
  );

  return preparedList;
}

export const App: React.FC = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState(0);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setList)
      .finally(() => setLoad(false));
  }, []);

  const visibleList = prepareList(list, filter, query);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSelect={setFilter}
                onSearch={setQuery}
                search={query}
              />
            </div>

            <div className="block">
              {load === true ? (
                <Loader />
              ) : (
                <TodoList list={visibleList} setId={setModal} modalId={modal} />
              )}
            </div>
          </div>
        </div>
      </div>
      {modal !== 0 && (
        <TodoModal postId={modal} resetId={setModal} list={visibleList} />
      )}
    </>
  );
};

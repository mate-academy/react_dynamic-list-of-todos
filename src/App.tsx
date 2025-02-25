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

function prepareList(list: Todo[], status: string, query: string) {
  let statusList: Todo[] = [];

  switch (status) {
    case 'all':
      statusList = [...list];
      break;

    case 'completed':
      statusList = [...list].filter(a => a.completed === true);
      break;

    case 'active':
      statusList = [...list].filter(a => a.completed === false);
      break;
  }

  const prepearedList = statusList.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()),
  );

  return prepearedList;
}

export const App: React.FC = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [modalId, setModalId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setList)
      .finally(() => setLoading(false));
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
              {loading === true ? (
                <Loader />
              ) : (
                <TodoList
                  list={visibleList}
                  setId={setModalId}
                  modalId={modalId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {modalId !== 0 && (
        <TodoModal postId={modalId} resetId={setModalId} list={visibleList} />
      )}
    </>
  );
};

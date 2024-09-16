import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Status } from './types/Status';
import { getPreparedTodos } from './untils/getPreparedTodos';

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Status.All);
  const [modalInfo, setModalInfo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(elemt => {
        setLoading(true);
        setPosts(elemt);
      })
      .catch(() => setLoading(true))
      .finally(() => setLoading(false));
  }, []);

  const visableTodos = useMemo(() => {
    return getPreparedTodos(posts, filter, query);
  }, [posts, filter, query]);

  const handlerFilter = (value: Status) => {
    setFilter(value);
  };

  const handlerQuery = (value: string) => {
    setQuery(value);
  };

  const handlerModal = (value: Todo) => {
    setModalInfo(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                setFilter={handlerFilter}
                setQuery={handlerQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                posts={visableTodos}
                modalInfo={modalInfo}
                setModal={handlerModal}
              />
            </div>
          </div>
        </div>
      </div>
      {modalInfo && <TodoModal modalInfo={modalInfo} setModal={setModalInfo} />}
    </>
  );
};

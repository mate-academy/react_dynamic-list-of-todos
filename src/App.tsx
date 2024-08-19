/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { TodosContext } from './store';

export const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpenedPost, setIsOpenedPost] = useState<boolean>(false);
  const {setTodos} = useContext(TodosContext);

  useEffect(() => {
    getTodos()
    .then((fetchData) => {
      setTodos(fetchData),
      localStorage.setItem('todos', JSON.stringify(fetchData));
    })
    .finally(() => setIsLoaded(true))
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {
                !isLoaded
                  ? <Loader />
                  : <TodoList setIsOpenedPost={setIsOpenedPost} />
              }
            </div>
          </div>
        </div>
      </div>

      {isOpenedPost && (
        <TodoModal
          setIsOpenedPost={setIsOpenedPost}
        />
      )}
    </>
  );
};

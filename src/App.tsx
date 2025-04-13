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
  const [todos, setTodods] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodods] = useState<Todo[]>([]);
  const [userId, setUserId] = useState(0);
  const [gettingTodo, setGettingTodos] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalIsShown, setModalIsShown] = useState(false);

  useEffect(() => {
    getTodos()
      .then((goods: Todo[]) => {
        setTodods(goods);
      })
      // eslint-disable-next-line
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} setVisibleTodods={setVisibleTodods} />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                visibleTodos={visibleTodos}
                setModalIsShown={setModalIsShown}
                modalIsShown={modalIsShown}
                gettingTodo={gettingTodo}
                setUserId={setUserId}
                setGettingTodos={setGettingTodos}
              />
            </div>
          </div>
        </div>
      </div>

      {modalIsShown && (
        <TodoModal
          userId={userId}
          setModalIsShown={setModalIsShown}
          gettingTodo={gettingTodo}
        />
      )}
    </>
  );
};

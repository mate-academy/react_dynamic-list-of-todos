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
  const [startingTodos, setStartingTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [todos, setTodo] = useState<Todo | null>(null);
  const [modalIsShown, setModalIsShown] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => {
        setVisibleTodos(data);
        setStartingTodos(data);
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
              <TodoFilter
                setVisibleTodos={setVisibleTodos}
                startingTodos={startingTodos}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                visibleTodos={visibleTodos}
                setUserId={setUserId}
                todos={todos}
                setTodo={setTodo}
                setModalIsShown={setModalIsShown}
                modalIsShown={modalIsShown}
              />
            </div>
          </div>
        </div>
      </div>

      {modalIsShown && (
        <TodoModal
          userId={userId}
          todos={todos}
          setModalIsShown={setModalIsShown}
        />
      )}
    </>
  );
};

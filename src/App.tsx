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
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>();
  const [todos, setTodos] = useState<Todo[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(-1);

  const curTodo = todos?.find(todo => todo.id === isModal);

  useEffect(() => {
    getTodos().then(res => {
      setTodos(res);
      setTodosFromServer(res);
      setIsLoading(false);
    });
  }, []);

  const changeModal = (id: number): void => {
    setIsModal(id);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todosFromServer} setTodos={setTodos} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {todos && (
                <TodoList
                  todos={todos}
                  isModal={isModal}
                  changeModal={changeModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {curTodo && <TodoModal todo={curTodo} changeModal={changeModal} />}
    </>
  );
};

/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { ShowModalContext } from './components/context/stateContext';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todosInitial, setTodosInitial] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>(todosInitial);
  const [user, setUser] = useState<User>();
  const [userId, setUserId] = useState(1);

  const { isModalShowed } = useContext(ShowModalContext);

  useEffect(() => {
    getTodos().then(setTodosInitial);
  }, []);

  useEffect(() => {
    getUser(userId).then(setUser);
    setTodos(todosInitial);
  }, [userId, todosInitial]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todosInitial={todosInitial}
                todosToRender={setTodos}
              />
            </div>

            <div className="block">
              {todos.length === 0 && <Loader />}

              <TodoList todos={todos} setCurrentUserId={setUserId} />
            </div>
          </div>
        </div>
      </div>

      {isModalShowed === true && <TodoModal user={user} todos={todos} />}
    </>
  );
};

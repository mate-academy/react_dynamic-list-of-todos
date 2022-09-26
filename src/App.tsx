/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
// import { User } from './types/User';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  const [modal, setModal] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(response => {
      setTodos(response);
      setFiltredTodos(response);
      // const todoWithUsers = response.map(todo => ({
      //   ...todo,
      //   user: getUser(todo.userId),
      // }));

      // console.log(todoWithUsers);
    });
  }, []);

  // console.log('DONT', modal);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} filter={setFiltredTodos} />
            </div>

            <div className="block">
              {(todos.length === 0 ? <Loader /> : <TodoList todos={filtredTodos} setModal={setModal} modalId={modal?.id} />)}
            </div>
          </div>
        </div>
      </div>

      {modal && (<TodoModal modal={modal} setModal={setModal} />)}
    </>
  );
};

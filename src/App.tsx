/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeModal, setActiveModal] = useState(false);
  const [activeUser, setAciverUser] = useState<User>();
  const [todoActive, setTodoActive] = useState<Todo>();
  const [filter, setActiveFilter] = useState('all');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    }

    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const activeTodo = (todo: Todo) => {
    getUser(todo.userId).then(user => {
      setAciverUser(user);
    });
    setTodoActive(todo);

    setActiveModal(!activeModal);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter filter={setActiveFilter} />
            </div>

            <div className="block">
              {todos.length ? <TodoList todos={filteredTodos} activeTodo={activeTodo} /> : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {activeModal
        ? <TodoModal user={activeUser} todo={todoActive} activeUser={setAciverUser} hide={setActiveModal} />
        : null}
    </>
  );
};

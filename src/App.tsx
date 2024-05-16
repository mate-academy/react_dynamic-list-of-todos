/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from "./types/Todo";
import { getTodos, getUser } from "./api";
import { Loader } from './components/Loader';
import { User } from "./types/User";

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalActive, setIsModalActive] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo>();
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((todos) => {
        setTodos(todos);
        setAllTodos(todos);
      })
      .finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    if (typeof currentTodo !== 'undefined') {
      setLoadingModal(true);
      getUser(currentTodo.userId)
        .then((userById) => {
          setCurrentUser(userById);
        })
        .finally(() => setLoadingModal(false));
    }
  }, [currentTodo]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter allTodos={allTodos} setTodos={setTodos}/>
            </div>

            <div className="block">
              {loading && todos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  onActiveModal={setIsModalActive}
                  onSetTodo={setCurrentTodo}
                  isModalActive={isModalActive}
                  activeTodo={currentTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalActive && (
        <TodoModal todo={currentTodo} user={currentUser} onSetActive={setIsModalActive} isLoading={loadingModal}/>
      )}
    </>
  );
};

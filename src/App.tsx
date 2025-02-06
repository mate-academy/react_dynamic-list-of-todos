/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [toDos, setToDos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [closeEyes, setCloseEyes] = useState<Record<number, boolean>>({});

  const toggleEye = (todoId: number) => {
    setCloseEyes(prevState => ({
      ...prevState,
      [todoId]: !prevState[todoId],
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then(todosFromServer => setToDos(todosFromServer))
      .finally(() => setIsLoading(false));
  }, []);

  const handleTodo = (todo: Todo) => {
    setIsModal(true);
    setCurrentTodo(todo);
    setUser(null);
    getUser(todo.userId).then(setUser);
  };

  const closeModal = (todoId: number) => {
    setIsModal(false);
    setCurrentTodo(null);
    setUser(null);
    toggleEye(todoId);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setToDos={setToDos} toDos={toDos} />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                handleTodo={handleTodo}
                todos={toDos}
                isModal={isModal}
                closeEyes={closeEyes}
                toggleEye={toggleEye}
              />
            </div>
          </div>
        </div>
      </div>

      {isModal && (
        <TodoModal
          user={user}
          currentTodo={currentTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

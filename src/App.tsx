/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToShow, setTodosToShow] = useState<Todo[]>(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo>(todos[0]);
  const [author, setAuthor] = useState<User>();
  const [todosLoading, setTodosLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    getTodos().then((todosFromServer: Todo[]) => {
      setTodos(() => todosFromServer);
      setTodosLoading(false);
    });
  }, []);

  const showModal = (todo: Todo) => {
    setModalLoading(true);
    setModalOpen(true);
    setSelectedTodo(todo);
    getUser(todo.userId).then((user: User) => {
      setAuthor(user);
      setModalLoading(false);
    });
  };

  const closeModal = () => {
    setModalLoading(false);
    setModalOpen(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setTodosToShow={setTodosToShow}
              />
            </div>

            <div className="block">
              {todosLoading
                ? <Loader />
                : (
                  <TodoList
                    todosToShow={todosToShow}
                    showModal={showModal}
                    selectedTodoId={
                      modalOpen ? selectedTodo?.id : -1
                    }
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen
      && (
        <TodoModal
          closeModal={closeModal}
          todo={selectedTodo}
          author={author}
          isLoading={modalLoading}
        />
      )}
    </>
  );
};

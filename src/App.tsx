/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

type ActiveModal = {
  todo: Todo | null,
  index: number,
  isActive: boolean,
};

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isActiveTodoList, setIsActiveTodoList] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>({
    todo: null,
    index: 0,
    isActive: false,
  });

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setVisibleTodos(todos);
        setTodosFromServer(todos);
      })
      .finally(() => setIsActiveTodoList(true));
  }, []);

  const hendlerFilterTodos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterBy = e.currentTarget.value;

    setIsActiveTodoList(false);
    getTodos()
      .then((todos) => (
        todos.filter(({ completed }) => {
          if (filterBy !== 'all') {
            return completed !== (filterBy === 'completed');
          }

          return true;
        })))
      .then((filterTodos) => {
        setTodosFromServer(filterTodos);
        setVisibleTodos(filterTodos);
      })
      .finally(() => setIsActiveTodoList(true));
  };

  const searchTodoInput = (value: string) => {
    if (value === '') {
      setVisibleTodos(todosFromServer);
    }

    setVisibleTodos(todosFromServer.filter(({ title }) => (
      title.includes(value)
    )));
  };

  const openModal = (todo: Todo, index: number) => {
    getUser(todo.userId).then((userFromServer) => setUser(userFromServer));

    setActiveModal({
      todo,
      index,
      isActive: true,
    });
  };

  const closeModal = () => {
    setActiveModal({
      todo: null,
      index: 0,
      isActive: false,
    });
    setUser(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterTodos={hendlerFilterTodos}
                searchTodo={searchTodoInput}
              />
            </div>

            <div className="block">
              {!isActiveTodoList
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    showDatails={openModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {activeModal.isActive && (
        <TodoModal
          user={user}
          closeModal={closeModal}
          todo={activeModal.todo}
          index={activeModal.index}
        />
      )}
    </>
  );
};

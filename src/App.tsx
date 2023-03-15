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
  selectedTodo: Todo | null,
  isActive: boolean,
};

const filterTodos = (todos: Todo[], filterBy: string, search: string) => {
  return todos.filter(({ completed }) => {
    if (filterBy !== 'all') {
      return completed !== (filterBy === 'completed');
    }

    return true;
  }).filter(({ title }) => {
    if (search !== '') {
      return title.toLowerCase().includes(search.toLowerCase());
    }

    return true;
  });
};

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isActiveTodoList, setIsActiveTodoList] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>({
    selectedTodo: null,
    isActive: false,
  });

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setVisibleTodos(todos);
      })
      .finally(() => setIsActiveTodoList(true));
  }, []);

  const hendlerFilterTodos = (filterBy: string, search: string) => {
    setIsActiveTodoList(false);
    getTodos()
      .then((todos) => filterTodos(todos, filterBy, search))
      .then((filteredTodos) => {
        setVisibleTodos(filteredTodos);
      })
      .finally(() => setIsActiveTodoList(true));
  };

  const openModal = (todo: Todo) => {
    getUser(todo.userId).then((userFromServer) => setUser(userFromServer));

    setActiveModal({
      selectedTodo: todo,
      isActive: true,
    });
  };

  const closeModal = () => {
    setActiveModal({
      selectedTodo: null,
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
          todo={activeModal.selectedTodo}
        />
      )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalIsLoading, setModalIsLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filter, setFilter] = useState(todos);
  const [query, setQuery] = useState('');

  const allTodos = [...todos];

  function sortUnfinished() {
    return [...allTodos].filter((todo) => todo.completed === false);
  }

  function sortFinished() {
    return [...allTodos].filter((todo) => todo.completed === true);
  }

  function switcher(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    if (value === 'active') {
      setFilter(sortUnfinished);
    } else if (value === 'completed') {
      setFilter(sortFinished);
    } else {
      // if the "All" option is selected, show all todos
      setFilter(todos);
    }
  }

  const visibleTodos = filter.filter((todo) => todo.title.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((data) => {
        setTodos(data);
        setFilter(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setModalIsLoading(true);

    if (selectedTodo?.userId) {
      getUser(selectedTodo?.userId)
        .then((data) => {
          setSelectedUser(data);
        })
        .finally(() => setModalIsLoading(false));
    }
  }, [selectedTodo]);

  const handleShowTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpenModal(true);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                // eslint-disable-next-line
                switcher={switcher}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList
                visibleTodos={visibleTodos}
                handleShowTodo={handleShowTodo}
              />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <TodoModal
          setOpenModal={setOpenModal}
          selectedTodo={selectedTodo}
          selectedUser={selectedUser}
          modalIsLoading={modalIsLoading}
          openModal={openModal}
        />
      )}
    </>
  );
};

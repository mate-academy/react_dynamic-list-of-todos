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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [usersSelect, setUsersSelect] = useState('all');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const hadleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUsersSelect(e.target.value);
  };

  const handleCloseModal = () => {
    setTodo(null);
    setOpenModal(false);
  };

  const filteredTodos = todos.filter(task => {
    const matchesStatus =
      usersSelect === 'all' ||
      (usersSelect === 'active' && !task.completed) ||
      (usersSelect === 'completed' && task.completed);

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleFilterSelectChange={handleFilterSelectChange}
                hadleSearchInputChange={hadleSearchInputChange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && !!todos.length && (
                <TodoList
                  todos={filteredTodos}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  setTodo={setTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <TodoModal todo={todo} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};

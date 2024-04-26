/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { Status, TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadTodos, setLoadTodos] = useState(false);
  const [filterStatus, setFilterStatus] = useState<Status>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [filterTitle, setFilterTitle] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [, setErrorMessage] = useState('');

  useEffect(() => {
    setLoadTodos(true);
    getTodos()
      .then(setTodos)
      .catch(error => setErrorMessage(error.message))
      .finally(() => setLoadTodos(false));
  }, []);

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFilterChange = (status: Status) => {
    setFilterStatus(status);
  };

  const handleTitleFilterChange = (title: string) => {
    setFilterTitle(title);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChange={handleFilterChange}
                onTitleFilterChange={handleTitleFilterChange}
                setFilterTitle={setFilterTitle}
                setFilterStatus={setFilterStatus}
                filterTitle={filterTitle}
              />
            </div>

            <div className="block">
              {loadTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  handleShowModal={handleShowModal}
                  filterStatus={filterStatus}
                  filterTitle={filterTitle}
                  modalOpen={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && selectedTodo && (
        <TodoModal
          closeModal={handleCloseModal}
          loading={false}
          todo={selectedTodo}
        />
      )}
    </>
  );
};

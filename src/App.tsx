/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

type FilterStatus = 'all' | 'active' | 'completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalShow(true);
  };

  const handleCloseModal = () => {
    setIsModalShow(false);
    setSelectedTodo(null);
  };

  if (errorMessage) {
    return (
      <div className="notification is-danger">
        Data not found: {errorMessage}
      </div>
    );
  }

  function getPreparedTodos(todosList: Todo[], value: string) {
    return todosList
      .filter(todo => {
        return todo.title.toLowerCase().includes(value.toLowerCase());
      })
      .filter(todo => {
        if (filterStatus === 'all') {
          return todo.completed || !todo.completed;
        }

        if (filterStatus === 'active') {
          return !todo.completed;
        }

        if (filterStatus === 'completed') {
          return todo.completed;
        }

        return;
      });
  }

  const filterTodos = getPreparedTodos(todos, searchValue);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchValue={searchValue}
                onSearch={setSearchValue}
                filterStatus={filterStatus}
                onFilterChange={setFilterStatus}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={filterTodos}
                  onOpenModal={handleOpenModal}
                  isModalShow={isModalShow}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalShow && selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} onClose={handleCloseModal} />
      )}
    </>
  );
};

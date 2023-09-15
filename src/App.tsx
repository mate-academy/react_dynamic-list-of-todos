/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Options } from './types/Options';
import { getTodos } from './api';

function getFilteredTodos(todos: Todo[], filter: Filter) {
  // let filteredTodos = [...todos];

  const filteredTodos: Todo[] = todos.filter(todo => {
    switch (filter.option) {
      case Options.active:
        return !todo.completed;

      case Options.completed:
        return todo.completed;

      case Options.all:
      default:
        return filteredTodos;
    }
  });

  if (filter.query) {
    filteredTodos.filter(({ title }) => title.includes(filter.query.trim()));
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>({ option: Options.all, query: '' });

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  const handleFilter = (currentFilter: Filter) => {
    setFilter(currentFilter);
  };

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter handleFilter={handleFilter} />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  handleShowModal={handleShowModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

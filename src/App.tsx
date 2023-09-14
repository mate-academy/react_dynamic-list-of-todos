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
import { Options } from './types/Options';
import { Filter } from './types/Filter';

function getFilteredTodos(todos: Todo[], filter: Filter): Todo[] {
  let filteredTodos = [...todos];

  filteredTodos = filteredTodos.filter(todo => {
    switch (filter.option) {
      case Options.Active:
        return !todo.completed;
      case Options.Completed:
        return todo.completed;
      case Options.All:
      default:
        return todo;
    }
  });

  if (filter.query) {
    filteredTodos = filteredTodos
      .filter(({ title }) => title.toLowerCase()
        .includes(filter.query.toLowerCase()));
  }

  return filteredTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>({ option: Options.All, query: '' });

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (currentFilter: Filter) => {
    setFilter(currentFilter);
  };

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  const handlerCloseModal = () => {
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
              {loading
                ? <Loader />
                : (
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

      {showModal
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            handlerCloseModal={handlerCloseModal}
          />
        )}
    </>
  );
};

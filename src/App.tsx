/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getAllTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter, FilterField } from './types/Filter';

function getFilteredTodos(todos :Todo[], filter: Filter) :Todo[] {
  let newTodos = [...todos];

  newTodos = newTodos.filter(todo => {
    switch (filter.field) {
      case FilterField.Active:
        return !todo.completed;
      case FilterField.Completed:
        return todo.completed;
      case FilterField.All:
      default:
        return todo;
    }
  });

  if (filter.query) {
    newTodos = newTodos
      .filter(({ title }) => title.toLowerCase()
        .includes(filter.query.toLowerCase()));
  }

  return newTodos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [choseTodoModal, setСhoseTodoModal] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>({ field: FilterField.All, query: '' });
  const [loading, setLoading] = useState(true);

  const visibleTodos = getFilteredTodos(todos, filter);

  const handleModal = (todo: Todo | null) => {
    setСhoseTodoModal(todo);
  };

  const handleFilter = (currentFilter: Filter) => {
    setFilter(currentFilter);
  };

  useEffect(() => {
    getAllTodos()
      .then((currentTodos: Todo[]) => {
        setTodos(currentTodos);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={handleFilter} />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} onModal={handleModal} choseTodoId={choseTodoModal?.id} />
              )}
            </div>
          </div>
        </div>
      </div>

      {choseTodoModal && (
        <TodoModal todo={choseTodoModal} onModal={handleModal} />
      )}
    </>
  );
};

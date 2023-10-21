/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { Options } from './types/Options';
import { getTodos } from './api';
import { Loader } from './components/Loader';

const getFilteredTodos = (todos: Todo[], filter: Filter):Todo[] => {
  let filterTodos = [...todos];

  filterTodos = filterTodos.filter(todo => {
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
    const lowercaseQuery = filter.query.toLowerCase();

    filterTodos = filterTodos
      .filter(({ title }) => title.toLowerCase().includes(lowercaseQuery));
  }

  return filterTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<Filter>({ option: Options.All, query: '' });

  const filteredTodos = getFilteredTodos(todos, filter);

  useEffect(() => {
    getTodos().then(setTodos)
      .finally(() => setLoading(false)).catch((error) => {
      // eslint-disable-next-line no-console
        console.error('Something bad happened!', error);
      });
  }, []);

  const handleFilter = (currentFilter: Filter) => {
    setFilter(currentFilter);
  };

  const handleShowModal = (todo: Todo) => {
    setTask(todo);
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
              {loading ? (
                <Loader />
              ) : (
                <TodoList todos={filteredTodos} handleShowModal={handleShowModal} selectTodo={task} />
              )}
            </div>
          </div>
        </div>
      </div>

      {task && <TodoModal todo={task} closeModal={() => setTask(null)} />}
    </>
  );
};

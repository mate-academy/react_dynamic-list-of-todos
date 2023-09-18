/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterEnum } from './types/filter';
import { TodoModal } from './components/TodoModal';
import { getTodos } from './api';

const getFilteredTodos = (todos: Todo[], filter: FilterEnum, query = ''):Todo[] => {
  let filterTodos = [...todos];

  filterTodos = filterTodos.filter(todo => {
    switch (filter) {
      case FilterEnum.active:
        return !todo.completed;
      case FilterEnum.completed:
        return todo.completed;
      case FilterEnum.all:
      default:
        return todo;
    }
  });

  if (query) {
    const lowercaseQuery = query.toLowerCase();

    filterTodos = filterTodos
      .filter(({ title }) => title.toLowerCase().includes(lowercaseQuery));
  }

  return filterTodos;
};

export const App: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.all);
  const [query, setQuery] = useState<string>('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTask, setSelectedTask] = useState<Todo | null>();

  useEffect(() => {
    getTodos().then(setTodos)
      .finally(() => setLoading(false)).catch((error) => {
      // eslint-disable-next-line no-console
        console.error('Something bad happened!', error);
      });
  }, []);

  useEffect(() => {
    const newTodos = getFilteredTodos(todos, filter, query as FilterEnum);

    setVisibleTodos(newTodos);
  }, [todos, query, filter]);

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilter={setFilter} filter={filter} query={query} setQuery={setQuery} />
            </div>

            <div className="block">
              {isLoading ? <Loader /> : <TodoList todos={visibleTodos} setSelectedTask={setSelectedTask} />}
            </div>
          </div>
        </div>
      </div>

      {selectedTask && <TodoModal todo={selectedTask} closeModal={handleCloseModal} />}
    </>
  );
};

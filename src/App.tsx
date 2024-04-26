/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterBy } from './types/Filter';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

function filter(todos: Todo[], type: FilterBy) {
  switch (type) {
    case FilterBy.active:
      return todos.filter(todo => todo.completed === false);

    case FilterBy.completed:
      return todos.filter(todo => todo.completed === true);

    case FilterBy.all:
    default:
      return todos;
  }
}

function filterByQuery(todos: Todo[], query: string) {
  const preparedQuery = query.toLowerCase();

  return query.length
    ? todos.filter(todo => todo.title.toLowerCase().includes(preparedQuery))
    : todos;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.all);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleChangeSort = (type: FilterBy) => {
    setFilterBy(type);
  };

  const handleTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeSort={handleChangeSort}
                query={query}
                changeQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterByQuery(filter(todos, filterBy), query)}
                  selectedTodo={selectedTodo}
                  handleSelectTodo={handleTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal todo={selectedTodo} closeModal={handleCloseModal} />
      )}
    </>
  );
};

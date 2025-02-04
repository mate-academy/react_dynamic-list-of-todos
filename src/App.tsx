/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState([] as Todo[]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null as Todo | null);
  const [query, setQuery] = useState('');
  const [filterParam, setFilterParam] = useState(Filter.all);

  const handleOpenModal = (item: Todo) => {
    setSelectedTodo(item);
  };

  const handleCloseModal = () => setSelectedTodo(null);

  const filteredTodos = useMemo(() => {
    switch (filterParam) {
      case Filter.all:
        return todos.filter(el =>
          el.title.toLowerCase().includes(query.toLowerCase()),
        );
      case Filter.completed:
        return todos.filter(
          el =>
            el.title.toLowerCase().includes(query.toLowerCase()) &&
            el.completed,
        );
      case Filter.active:
        return todos.filter(
          el =>
            el.title.toLowerCase().includes(query.toLowerCase()) &&
            !el.completed,
        );
      default:
        return todos.filter(el =>
          el.title.toLowerCase().includes(query.toLowerCase()),
        );
    }
  }, [filterParam, query, todos]);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                searchTodo={setQuery}
                handleFiltered={setFilterParam}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  todo={selectedTodo}
                  handleSelect={handleOpenModal}
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

/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const handleQueryChange = (filterQuery: string) => {
    setQuery(filterQuery);
  };

  const filteredTodos = todos
    .filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );

  const handleShowModal = (todo: Todo) => {
    setShowModal(true);
    setSelectedTodo(todo);
    setSelectedTodoId(todo.id);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setShowModal(false);
    setSelectedTodoId(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filter}
                onFilterChange={handleFilterChange}
                query={query}
                onQueryChange={handleQueryChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && !!filteredTodos.length && (
                <TodoList
                  todos={filteredTodos}
                  onShowModal={handleShowModal}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && selectedTodo && (
        <TodoModal todo={selectedTodo} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};

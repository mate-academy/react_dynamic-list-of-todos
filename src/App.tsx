/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todosList => setTodos(todosList))
      .finally(() => setLoading(false));
  }, []);

  function openModal(todo: Todo) {
    setModal(true);
    setSelectedTodo(todo);
  }

  function closeModal() {
    setModal(false);
    setSelectedTodo(null);
  }

  useEffect(() => {
    setFilteredTodos(
      todos.filter(todo => {
        if (!todo.title.toLowerCase().includes(query.toLowerCase())) {
          return false;
        }

        if (filter === 'active') {
          return todo.completed === false;
        } else if (filter === 'completed') {
          return todo.completed === true;
        } else {
          return true;
        }
      }),
    );
  }, [filter, todos, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  filteredTodos={filteredTodos}
                  selectedTodo={selectedTodo}
                  openModal={openModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modal && selectedTodo && (
        <TodoModal selectedTodo={selectedTodo} closeModal={closeModal} />
      )}
    </>
  );
};

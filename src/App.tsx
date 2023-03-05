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

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isModal, setModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter | string>(Filter.ALL);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos()
      .then(res => {
        setTodos(res);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    switch (filter) {
      case Filter.ACTIVE:
        setFilteredTodos(todos.filter(todo => !todo.completed));

        break;
      case Filter.COMPLETED:
        setFilteredTodos(todos.filter(todo => todo.completed));

        break;
      default:
        setFilteredTodos(todos);
    }
  }, [filter, todos]);

  const showModal = (todo: Todo) => {
    setModal(true);
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setModal(false);
  };

  const changeFilter = (value: string) => setFilter(value);

  const changeSearchQuery = (value: string) => {
    setSearchQuery(value);
  };

  const clearSearchQuery = () => setSearchQuery('');

  const visibleTodos = filteredTodos.filter(todo => {
    return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                changeFilter={changeFilter}
                searchQuery={searchQuery}
                changeSearchQuery={changeSearchQuery}
                clearSearchQuery={clearSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading
                ? <Loader />
                : (
                  <TodoList
                    todos={visibleTodos}
                    isModal={isModal}
                    showModal={showModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {isModal && (
        <TodoModal
          selectedTodo={selectedTodo}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

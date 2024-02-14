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
import { FilterType } from './types/Filter';
import { filterActiveOrCompletedTodosBySearchQuery, filterTodosBySearchQuery } from './services/Filtration';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    getTodos().then((todosList) => {
      setTodos(todosList);
      setFilteredTodos(todosList);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let filtered;

    if (searchQuery === '') {
      switch (filter) {
        case FilterType.ALL:
          filtered = todos;
          break;

        case FilterType.COMPLETED:
          filtered = todos.filter(todo => todo.completed);
          break;

        case FilterType.ACTIVE:
          filtered = todos.filter(todo => !todo.completed);
          break;

        default:
          filtered = todos;
          break;
      }
    } else {
      switch (filter) {
        case FilterType.ALL:
          filtered = filterTodosBySearchQuery(todos, searchQuery);
          break;

        case FilterType.COMPLETED:
          filtered = filterActiveOrCompletedTodosBySearchQuery(todos, searchQuery, true);
          break;

        case FilterType.ACTIVE:
          filtered = filterActiveOrCompletedTodosBySearchQuery(todos, searchQuery, false);
          break;

        default:
          filtered = filterTodosBySearchQuery(todos, searchQuery);
          break;
      }
    }

    setFilteredTodos(filtered);
  }, [todos, filter, searchQuery]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleShowModal = (todo: Todo) => {
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
                filter={filter}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {loading ? <Loader /> : (
                <TodoList
                  todos={filteredTodos}
                  onShowModal={handleShowModal}
                  selectedTodoId={selectedTodo?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
    && (
      <TodoModal
        todo={selectedTodo}
        onCloseModal={handleCloseModal}
      />
    )}
    </>
  );
};

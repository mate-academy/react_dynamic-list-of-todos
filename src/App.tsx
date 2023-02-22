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

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const handleQueryChange = (input: string) => {
    setSearchQuery(input);
  };

  const handleShowCLick = (id: number) => {
    setSelectedTodoId(id);
  };

  const handleModalCloseClick = () => {
    setSelectedTodoId(0);
  };

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value);
  };

  const normalizedQuery = searchQuery
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .join(' ');

  const visibleTodos = todos.filter(todo => {
    const normalizedTodoTitle = todo.title.toLowerCase();
    const isSearchQuery = normalizedTodoTitle.includes(normalizedQuery);

    let selectedFilterStatus = true;

    if (selectedFilter === 'active') {
      selectedFilterStatus = !todo.completed;
    }

    if (selectedFilter === 'completed') {
      selectedFilterStatus = todo.completed;
    }

    return isSearchQuery && selectedFilterStatus;
  });

  const todoToShow = visibleTodos.find(todo => todo.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                onSearch={handleQueryChange}
                selectedFilter={selectedFilter}
                onFilterSelect={handleFilterSelect}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onShow={handleShowCLick}
                  selectedTodoId={selectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoToShow && <TodoModal todo={todoToShow} onClose={handleModalCloseClick} />}
    </>
  );
};

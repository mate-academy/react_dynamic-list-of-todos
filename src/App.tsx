/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then((setTodos))
      .finally(() => setLoading(false));
  }, []);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedFilter(selectedFilter);
    setSelectedTodoId(todo.id);
  };

  const handleModalClosing = () => {
    setSelectedTodoId(0);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
  };

  const getFilteredTodos = () => {
    let filteredTodos = todos;

    if (selectedFilter === 'active') {
      filteredTodos = filteredTodos.filter((todo) => !todo.completed);
    } else if (selectedFilter === 'completed') {
      filteredTodos = filteredTodos.filter((todo) => todo.completed);
    }

    if (searchInput.trim() !== '') {
      filteredTodos = filteredTodos.filter((todo) => todo.title.toLowerCase().includes(searchInput.toLowerCase()));
    }

    return filteredTodos;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchInput={searchInput}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                onSearchInputChange={handleSearchInputChange}
                onClearSearch={handleClearSearch}
              />
            </div>

            <div className="block">
              {loading
                ? <Loader />
                : (
                  <TodoList
                    todos={getFilteredTodos()}
                    onSelect={handleTodoSelect}
                    isSelected={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId !== 0 && (
        <TodoModal
          todos={todos}
          todoId={selectedTodoId}
          onClose={handleModalClosing}
        />
      )}
    </>
  );
};

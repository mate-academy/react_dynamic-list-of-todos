/* eslint-disable max-len */
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, { useEffect, useState, useMemo } from 'react';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { sortedTodos } from './hepler/sortedTodos';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const visibleTodos = useMemo(() => {
    let filteredTodos = sortedTodos(todos, selectedFilter);

    if (searchQuery) {
      const preparedQuery = searchQuery.toLowerCase().trim();

      filteredTodos = filteredTodos.filter(
        todo => todo.title.includes(preparedQuery),
      );
    }

    return filteredTodos;
  }, [todos, searchQuery, selectedFilter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={searchQuery}
                handleSearch={handleSearch}
                handleClear={handleClear}
                handleSelect={handleSelect}
                selectedFilter={selectedFilter}
              />
            </div>

            <div className="block">
              <TodoList
                todos={visibleTodos}
                onSelectTodo={handleSelectTodo}
                selectedTodo={selectedTodo}
              />

              {isLoading && (
                <Loader />)}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

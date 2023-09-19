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
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSelectedTodo, setIsSelectedTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [selectedTodoUserId, setSelectedTodoUserId] = useState(0);
  const [showButtonHide, setShowButtonHide] = useState(false);

  const visibleTodos = todos.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));

  // сделать фильтрацию отдельно от сервера
  useEffect(() => {
    if (selectedFilter === 'all') {
      getTodos()
        .then(setTodos)
        .finally(() => setLoading(false));
    } else if (selectedFilter === 'completed') {
      getTodos()
        .then(prevTodos => setTodos(prevTodos.filter(({ completed }) => completed)))
        .finally(() => setLoading(false));
    } else {
      getTodos()
        .then(prevTodos => setTodos(prevTodos.filter(({ completed }) => !completed)))
        .finally(() => setLoading(false));
    }
  }, [selectedFilter]);

  const handleSelectedFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelectButton = (value: boolean) => {
    setIsSelectedTodo(value);
  };

  const handleSelectedTodoUserId = (userId: number) => {
    setSelectedTodoUserId(userId);
  };

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const handleShowSelectedTodoButton = (value: boolean) => {
    setShowButtonHide(value);
  };

  const resetForm = () => {
    setQuery('');
    setSelectedFilter('all');
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleSelectedFilter={handleSelectedFilter}
                selectedFilter={selectedFilter}
                query={query}
                handleQueryChange={handleQueryChange}
                resetForm={resetForm}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && (
                <TodoList
                  todos={visibleTodos}
                  handleSelectButton={handleSelectButton}
                  handleSelectedTodoUserId={handleSelectedTodoUserId}
                  handleSelectTodo={handleSelectTodo}
                  handleShowSelectedTodoButton={handleShowSelectedTodoButton}
                  showButtonHide={showButtonHide}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isSelectedTodo && showButtonHide && (
        <TodoModal
          selectedTodoUserId={selectedTodoUserId}
          selectedTodo={selectedTodo}
          handleShowSelectedTodoButton={handleShowSelectedTodoButton}
        />
      )}
    </>
  );
};

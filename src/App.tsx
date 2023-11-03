/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Filter } from './types/Filter';
import { Todo } from './types/index';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.all);
  const [todos, setTodos] = useState<Todo[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingTodos(true);
      try {
        const todoData = await getTodos();

        setTodos(todoData);
      } finally {
        setIsLoadingTodos(false);
      }
    };

    fetchData();
  }, []);

  const handleTodoSelect = useCallback((todo: Todo | null) => setSelectedTodo(todo), [setSelectedTodo]);

  const handleChangeQuery = (data: string) => {
    setQuery(data);
  };

  const handleChangeSelected = (data: Filter) => {
    setSelectedFilter(data);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChangeSelected={handleChangeSelected}
                handleChangeQuery={handleChangeQuery}
                query={query}
                selectedFilter={selectedFilter}
              />
            </div>

            <div className="block">
              {isLoadingTodos ? <Loader /> : (
                <TodoList
                  todos={todos}
                  handleTodoSelect={handleTodoSelect}
                  query={query}
                  selectedFilter={selectedFilter}
                  todoId={selectedTodo ? selectedTodo.id : null}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal
        selectedTodo={selectedTodo}
        handleTodoSelect={handleTodoSelect}
      />
    </>
  );
};

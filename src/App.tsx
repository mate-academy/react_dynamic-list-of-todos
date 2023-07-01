/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import './App.scss';
import { FilterTodos } from './types/FilterTodos';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(FilterTodos.ALL);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await getTodos();

        setVisibleTodos(todos);
      } catch (error) {
        throw new Error();
      }
    };

    loadTodos();
  }, []);

  const handleEraseInput = () => {
    setQuery('');
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
  };

  const handleSelected = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleQuery = (search: string) => {
    setQuery(search);
  };

  const handleStatus = useCallback((todoStatus: FilterTodos) => {
    setStatus(todoStatus);
  }, []);

  const filterTodos = useCallback((search: string, todoStatus: string) => {
    return visibleTodos.filter(todo => {
      const formattedQuery = search.toLowerCase();
      const formattedTitle = todo.title.toLowerCase();

      if (todoStatus === FilterTodos.ACTIVE) {
        return !todo.completed && formattedTitle.includes(formattedQuery);
      }

      if (todoStatus === FilterTodos.COMPLETED) {
        return todo.completed && formattedTitle.includes(formattedQuery);
      }

      return formattedTitle.includes(formattedQuery);
    });
  }, [query, status, visibleTodos]);

  const filteredTodos = filterTodos(query, status);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleQuery={handleQuery}
                handleStatus={handleStatus}
                handleEraseInput={handleEraseInput}
              />
            </div>

            <div className="block">
              {filteredTodos.length
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    handleSelected={handleSelected}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

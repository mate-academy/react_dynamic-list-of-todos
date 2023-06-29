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

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState('All');

  const loadTodos = useCallback(async () => {
    try {
      const todos = await getTodos();

      setVisibleTodos(todos);
    } catch (error) {
      throw new Error();
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleEraseInput = useCallback(() => {
    setQuery('');
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const handleSelected = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleQuery = useCallback((search: string) => {
    setQuery(search);
  }, []);

  const handleStatus = useCallback((todoStatus: string) => {
    setStatus(todoStatus);
  }, []);

  const filterTodos = useCallback((search: string, todoStatus: string) => {
    if (todoStatus === 'completed') {
      return visibleTodos.filter(todo => (
        todo.completed && todo.title.toLowerCase().includes(search.toLowerCase())
      ));
    }

    if (todoStatus === 'active') {
      return visibleTodos.filter(todo => (
        !todo.completed && todo.title.toLowerCase().includes(search.toLowerCase())
      ));
    }

    return visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(search.toLowerCase())));
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

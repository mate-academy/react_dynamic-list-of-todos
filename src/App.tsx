/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<boolean | null>(null);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const setterOfSelectedTodo = (pickedTodo: Todo | null) => {
    setSelectedTodo(pickedTodo);
  };

  const filterByStatus = (option: string) => {
    if (option === 'all') {
      setStatus(null);
    }

    if (option === 'active') {
      setStatus(false);
    }

    if (option === 'completed') {
      setStatus(true);
    }
  };

  const handleClose = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  const filterByQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  let filteredTodos = [...todos];

  if (status !== null) {
    filteredTodos = filteredTodos
      .filter(todoStatus => todoStatus.completed === status);
  }

  if (query.trim() !== '') {
    const lowerQuery = query.toLocaleLowerCase().trim();

    filteredTodos = filteredTodos
      .filter(todoQuery => todoQuery.title.toLocaleLowerCase().trim().includes(lowerQuery));
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterByStatus={filterByStatus}
                filterByQuery={filterByQuery}
                query={query}
              />
            </div>

            <div className="block">
              {todos.length
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    setterOfSelectedTodo={setterOfSelectedTodo}
                  />
                )
                : (<Loader />)}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onClose={handleClose}
        />
      )}
    </>
  );
};

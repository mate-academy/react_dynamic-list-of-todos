/* eslint-disable max-len */
import React, { useState, useEffect, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');

  async function getTodosFromServer() {
    const allTodos = await getTodos();

    setTodos(allTodos);
  }

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const filteredTodos = () => {
    return todos.filter(todo => {
      const queryFilter = todo.title.toLowerCase().includes(query.toLowerCase().trim());

      switch (filter) {
        case 'active':
          return queryFilter && !todo.completed;
        case 'completed':
          return queryFilter && todo.completed;
        default:
          return queryFilter;
      }
    });
  };

  const handleModalClose = useCallback(() => {
    return setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                query={query}
                onSetFilter={setFilter}
                onSetQuery={setQuery}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos()}
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onModalClose={handleModalClose}
        />
      )}
    </>
  );
};

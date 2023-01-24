/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';

import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      const lowerTitle = todo.title.toLowerCase();
      const normalizedQuery = query.toLowerCase().trim();

      const isQueryMatch = lowerTitle.includes(normalizedQuery);
      let isStatus = true;

      switch (status) {
        case 'active':
          isStatus = !todo.completed;
          break;

        case 'completed':
          isStatus = todo.completed;
          break;

        default:
          isStatus = true;
      }

      return isQueryMatch && isStatus;
    })
  ), [todos, query, status]);

  const selectTodoId = (todoId: number) => {
    setSelectedTodoId(todoId);
  };

  const selectedTodo = useMemo(() => (
    visibleTodos.find(todo => (
      todo.id === selectedTodoId
    ))
  ), [visibleTodos, selectTodoId]);

  const closeSelectedTodo = () => {
    setSelectedTodoId(0);
  };

  const filterByQuery = (value: string) => {
    setQuery(value);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const selectStatus = (value: string) => {
    setStatus(value);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                filter={filterByQuery}
                onClose={clearQuery}
                onSelectStatus={selectStatus}
                status={status}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={visibleTodos}
                    selectedTodoId={selectedTodoId}
                    onSelectedTodoId={selectTodoId}
                  />
                )
                : (
                  <Loader />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          onModal={closeSelectedTodo}
          todo={selectedTodo}
        />
      )}
    </>
  );
};

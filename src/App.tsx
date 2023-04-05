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
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  let visibleTodos: Todo[] = [...todos];
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  if (filterType === 'active') {
    visibleTodos = visibleTodos.filter(todo => !todo.completed);
  }

  if (filterType === 'completed') {
    visibleTodos = visibleTodos.filter(todo => todo.completed);
  }

  visibleTodos = visibleTodos
    .filter(todo => todo.title.toLowerCase()
      .includes(query.trim().toLowerCase()));

  const renderedList = visibleTodos.length === 0
    ? (
      <h2>Users not found!</h2>
    )
    : (
      <TodoList
        todos={visibleTodos}
        selectedTodoId={selectedTodoId}
        setSelectedTodoId={setSelectedTodoId}
      />
    );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                todos={todos}
                setTodos={setTodos}
                query={query}
                setQuery={setQuery}
                filterType={filterType}
                setFilterType={setFilterType}
              />
            </div>

            <div className="block">
              {isLoading || hasError
                ? (
                  <Loader />
                )
                : renderedList}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodoId={setSelectedTodoId}
        />
      )}
    </>
  );
};

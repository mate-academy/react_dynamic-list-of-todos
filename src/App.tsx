/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [todoFilter, setTodoFilter] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos);
  }, []);

  const handleSelectingTodo = useCallback((todo: Todo) => {
    setSelectedTodo(todo);
  }, []);

  let vissibleTodos = todos.filter(todo => {
    const lowerQuery = query.toLowerCase().trim();
    const lowerTitle = todo.title.toLowerCase();

    return lowerTitle.includes(lowerQuery);
  });

  const handleSetQuery = (event:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSetFilter = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setTodoFilter(event.target.value);
  };

  const resetQuery = () => {
    setQuery('');
  };

  switch (todoFilter) {
    case 'active':
      vissibleTodos = vissibleTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      vissibleTodos = vissibleTodos.filter(todo => todo.completed);
      break;
    case 'all':
      setTodoFilter('');
      break;
    default:
      break;
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                handleSetFilter={handleSetFilter}
                handleSetQuery={handleSetQuery}
                resetQuery={resetQuery}
              />
            </div>

            <div className="block">
              {todos.length > 0
                ? (
                  <TodoList
                    todos={vissibleTodos}
                    selectedTodoId={selectedTodo?.id}
                    onSelectTodo={handleSelectingTodo}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelectedTodo={() => setSelectedTodo(null)}
        />
      )}
    </>
  );
};

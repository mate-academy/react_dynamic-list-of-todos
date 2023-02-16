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
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [todosFilter, setTodosFilter] = useState('all');

  let visibleTodos = todos.filter(todo => {
    switch (todosFilter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      case 'all':
        return true;
      default:
        throw new Error('Wrong todo status');
    }
  });

  const [selectedTodo] = visibleTodos.filter(todo => todo.id === selectedTodoId);
  const clearSelectedTodo = () => {
    setSelectedTodoId(0);
  };

  useEffect(() => {
    const todosFromServer = async () => {
      const allTodos = await getTodos();

      setTodos(allTodos);
      setIsDataLoading(false);
    };

    todosFromServer()
      .catch(() => setIsLoadingError(true));
  }, []);

  if (searchQuery) {
    visibleTodos = visibleTodos.filter(todo => {
      const preparedQuery = searchQuery.toLowerCase();
      const preparedTitle = todo.title.toLowerCase();

      return preparedTitle.includes(preparedQuery);
    });
  }

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                todosFilter={todosFilter}
                onSearchQueryChange={setSearchQuery}
                onTodosFilterChange={setTodosFilter}
              />
            </div>

            <div className="block">
              {isLoadingError || (isDataLoading && <Loader />)}
              {isLoadingError
                ? <p>Error, server is unavailable</p>
                : (
                  <TodoList
                    todos={visibleTodos}
                    onTodoSelected={setSelectedTodoId}
                    selectedTodoId={selectedTodoId}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodoId !== 0
        && (
          <TodoModal
            todo={selectedTodo}
            clearSelectedTodo={clearSelectedTodo}
          />
        )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

function getVisibleTodos(todos: Todo[], filterType: string, query: string): Todo[] {
  return todos.filter(todo => {
    const lowerQuery = query.toLowerCase();
    const lowerTitle = todo.title.toLowerCase();

    switch (filterType) {
      case 'all':
        return query
          ? lowerTitle.includes(lowerQuery)
          : todo;

      case 'active':
        return query
          ? lowerTitle.includes(lowerQuery) && !todo.completed
          : !todo.completed;

      case 'completed':
        return query
          ? lowerTitle.includes(lowerQuery) && todo.completed
          : todo.completed;

      default:
        throw new Error('Invalid filter selected');
    }
  });
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);
  const [idOfSelectedTodo, setIdOfSelectedTodo] = useState(0);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [query, setQuery] = useState('');

  const selectedTodo = todos.find(todo => todo.id === idOfSelectedTodo) || null;

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
      setIsTodosLoaded(true);
    } catch (error) {
      throw new Error('Something went wrong. Try again later, please');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = useMemo(() => getVisibleTodos(todos, selectedFilter, query), [todos, selectedFilter, query]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  const handleSelect = (todoId: number, userId: number) => {
    setIdOfSelectedTodo(todoId);
    setSelectedUserId(userId);
  };

  const handleCloseButton = () => {
    setIdOfSelectedTodo(0);
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
                selectedFilter={selectedFilter}
                handleFilterChange={handleFilterChange}
                handleClearSearch={handleClearSearch}
                handleInput={handleInput}
              />
            </div>

            <div className="block">
              {!isTodosLoaded && <Loader />}

              {todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  todoId={idOfSelectedTodo}
                  handleSelect={handleSelect}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {idOfSelectedTodo && (
        <TodoModal
          handleCloseButton={handleCloseButton}
          selectedUserId={selectedUserId}
          todo={selectedTodo}
        />
      )}
    </>
  );
};

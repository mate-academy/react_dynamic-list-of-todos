/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { StatusFilter } from './types/StatusFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTodos = todos.filter(todo => {
    let matchesStatus = true;

    if (statusFilter === 'active') {
      matchesStatus = todo.completed === false;
    } else if (statusFilter === 'completed') {
      matchesStatus = todo.completed === true;
    }

    let matchesSearch = true;

    if (searchQuery) {
      matchesSearch = todo.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }

    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    setIsLoading(true);
    getTodos().then(todosData => {
      setTodos(todosData);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusFilter={statusFilter}
                searchQuery={searchQuery}
                onStatusFilterChange={setStatusFilter}
                onSearchQueryChange={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodoId={selectedTodoId}
                  onSelectTodo={setSelectedTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoId && (
        <TodoModal
          todos={todos}
          selectedTodoId={selectedTodoId}
          onClose={() => setSelectedTodoId(null)}
        />
      )}
    </>
  );
};

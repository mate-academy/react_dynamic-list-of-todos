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
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterByStatus, setFilterByStatus] = useState(FilterStatus.All);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTodos().then(items => {
      setIsLoading(false);
      setTodos(items);
    });
  }, []);

  const visibleTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    .filter(todo => {
      switch (filterByStatus) {
        case FilterStatus.Active:
          return !todo.completed;

        case FilterStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filteredBy={filterByStatus}
                setFilteredValue={setFilterByStatus}
                setAppliedQuery={setSearchQuery}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              { visibleTodos && !isLoading && (
                <TodoList
                  todos={visibleTodos}
                  selectedTodo={selectedTodo ? selectedTodo.id : 0}
                  selectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          deleteSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

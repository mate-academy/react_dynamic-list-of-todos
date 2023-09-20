/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { TodoStatus } from './types/TodoStatus';
import { getFilteredTodos } from './components/utils/getFilteredTodos';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [todoStatusFilter, setTodoStatusFilter] = useState(TodoStatus.All);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getTodos().then(setVisibleTodos)
      .catch(() => {
        // eslint-disable-next-line
        console.log('Error loading todos')
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(visibleTodos, searchQuery, todoStatusFilter);
  }, [searchQuery, todoStatusFilter, visibleTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterField={searchQuery}
                setFilterField={setSearchQuery}
                selectFilter={todoStatusFilter}
                setSelectFilter={setTodoStatusFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : (
                <TodoList
                  selectTodo={selectedTodo}
                  visibleTodos={filteredTodos}
                  setSelectTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          setSelectTodo={setSelectedTodo}
          selectTodo={selectedTodo}
        />
      )}
    </>
  );
};

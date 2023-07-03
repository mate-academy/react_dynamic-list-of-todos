/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterStatus } from './helper';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoadedTodos, setIsLoadedTodos] = useState(false);
  const [isTodoInfoRequested, setIsTodoInfoRequested] = useState(false);
  const [filterCondition, setFilterCondition] = useState(FilterStatus.ALL);
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await getTodos();

        setIsLoadedTodos(true);
        setTodos(loadedTodos);
      } catch (error) {
        setIsLoadedTodos(true);
        setIsLoadingError(true);
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const queriedTodo = todo.title.toLowerCase().includes(query.toLowerCase());

      switch (filterCondition) {
        case FilterStatus.ALL:
          return queriedTodo;
        case FilterStatus.ACTIVE:
          return queriedTodo && !todo.completed;
        case FilterStatus.COMPLETED:
          return queriedTodo && todo.completed;
        default:
          return 0;
      }
    });
  }, [todos, filterCondition, query]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterChange={setFilterCondition}
                currentFilter={filterCondition}
                onQueryChange={setQuery}
                currentQuery={query}
              />
            </div>

            {!isLoadedTodos && <Loader />}

            <div className="block">
              {!isLoadingError
                ? (
                  <TodoList
                    todos={filteredTodos}
                    selectedTodo={selectedTodo}
                    isTodoInfoRequested={isTodoInfoRequested}
                    onTodoInfoRequest={setIsTodoInfoRequested}
                    onUserIdChange={setUserId}
                    onSelectedTodoChange={setSelectedTodo}
                  />
                )
                : (
                  <div className="message p-2 my-4 is-danger">
                    <p className="message-body">Error loading goods</p>
                  </div>
                )}

            </div>
          </div>
        </div>
      </div>

      {isTodoInfoRequested && (
        <TodoModal
          onTodoInfoRequestedChange={setIsTodoInfoRequested}
          currntUserId={userId}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};

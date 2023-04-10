/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo, StatusToFilter } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [statusToFilter, setStatusToFilter] = useState(StatusToFilter.All);
  const [filterQuery, setFilterQuery] = useState('');

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = todos.filter((todo) => {
    let isStatusCorrect = true;
    const lowerCasedTitle = todo.title.toLowerCase();
    const lowerCasedQuery = filterQuery.toLowerCase().trim();

    switch (statusToFilter) {
      case StatusToFilter.Active:
        isStatusCorrect = !todo.completed;
        break;

      case StatusToFilter.Completed:
        isStatusCorrect = todo.completed;
        break;

      default:
        break;
    }

    return isStatusCorrect && lowerCasedTitle.includes(lowerCasedQuery);
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                statusToFilter={statusToFilter}
                setStatusToFilter={setStatusToFilter}
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
              />
            </div>

            <div className="block">
              {hasError && (
                <h2 style={{ color: 'red' }}>
                  An error occured while todos loading
                </h2>
              )}
              {isLoading && <Loader />}

              {!hasError && !isLoading && (
                <TodoList
                  todos={visibleTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

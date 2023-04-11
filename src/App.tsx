import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';

import { Todo } from './types/Todo';
import { FilterStatus } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);
  const [filterQuery, setFilterQuery] = useState('');

  const getTodosFromServer = async () => {
    try {
      const todosFromServer = await getTodos();

      setTodos(todosFromServer);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  const visibleTodos = todos.filter(todo => {
    let isStatusCorrect = true;
    const lowerCasedTitle = todo.title.toLowerCase();
    const lowerCasedQuery = filterQuery.toLowerCase();

    switch (filterStatus) {
      case FilterStatus.Active:
        isStatusCorrect = !todo.completed;
        break;

      case FilterStatus.Completed:
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
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
              />
            </div>

            <div className="block">
              {hasError && (
                <h2 style={{ color: 'red' }}>
                  An error found while loading todos
                </h2>
              )}

              {isLoading && (
                <Loader />
              )}

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
          todo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

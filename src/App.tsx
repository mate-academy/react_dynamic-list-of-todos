/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      getTodos().then(setTodos);
    } catch {
      setIsError(true);
    }
  }, []);

  const selectedTodo = useMemo(() => (
    todos.find(todo => todo.id === selectedTodoId)
  ), [todos, selectedTodoId]);

  const visibleTodos = useMemo(() => {
    const preparedQuery = query.toLowerCase();

    return todos.filter((todo) => {
      const { title } = todo;
      const preparedTitle = title.toLowerCase();

      const isQueryMatching = preparedTitle.includes(preparedQuery);

      switch (filterStatus) {
        case 'active':
          return !todo.completed && isQueryMatching;

        case 'completed':
          return todo.completed && isQueryMatching;

        default:
          return isQueryMatching;
      }
    });
  }, [todos, query, filterStatus]);

  return (
    <>
      {isError
        ? <h1>Ooops, looks like smth went wrong</h1>
        : (
          <div className="section">
            <div className="container">
              <div className="box">
                <h1 className="title">Todos:</h1>

                <div className="block">
                  <TodoFilter
                    query={query}
                    filterStatus={filterStatus}
                    onInputChange={setQuery}
                    onFilterStatusChange={setFilterStatus}
                  />
                </div>

                <div className="block">
                  {todos.length > 0
                    ? (
                      <TodoList
                        todos={visibleTodos}
                        selectedTodo={selectedTodo}
                        onSelectedTodoIdChange={setSelectedTodoId}
                      />
                    )
                    : <Loader />}
                </div>
              </div>
            </div>
          </div>
        )}

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          onSelectedTodoIdChange={setSelectedTodoId}
        />
      )}
    </>
  );
};

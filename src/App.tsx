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

//import { log } from 'console';

export const App = () => {
  //#region states

  // filtered states
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [query, setQuery] = useState('');

  // selected Todo for Modal
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // Api todos
  const [todosList, setTodosList] = useState<Todo[]>([]);
  // tools of states
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  //#endregion states

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    getTodos()
      .then(data => setTodosList(data))
      .catch(() => setIsError('Неизвестная ошибка при загрузке'))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const filteredStatusSelect = todosList.filter(todo => {
      if (selectedFilter === 'active') {
        return !todo.completed;
      }

      if (selectedFilter === 'completed') {
        return todo.completed;
      }

      return true;
    });

    if (query) {
      const queryNormalize: string = query.toLowerCase().trim();

      return filteredStatusSelect.filter(todo => {
        return todo.title.toLowerCase().includes(queryNormalize);
      });
    }

    return filteredStatusSelect;
  }, [query, selectedFilter, todosList]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectedFilter={setSelectedFilter}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <Loader />
              ) : isError ? (
                <div className="has-text-danger block">{isError}</div>
              ) : (
                <TodoList
                  todoList={visibleTodos}
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

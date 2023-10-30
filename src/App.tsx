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
import { todoFilter } from './types/utils/todoFilter';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);

    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  }, []);

  const onSelectTodo = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const onSetQuery = (newQuery: string) => {
    setQuery(newQuery.trim());
  };

  const onSetFilter = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredTodo = todoFilter(filter, query, todosFromServer);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onSetQuery={onSetQuery}
                onSetFilter={onSetFilter}
                query={query}
                filter={filter}
              />
            </div>

            <div className="block">
              {isLoading
                && <Loader />}
              {!isLoading && !errorMessage
                && (
                  <TodoList
                    todos={filteredTodo}
                    selectedTodo={selectedTodo}
                    onSelectTodo={onSelectTodo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo
        && (
          <TodoModal
            selectedTodo={selectedTodo}
            onSelectTodo={onSelectTodo}
          />
        )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Loader } from './components/Loader';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filterOptionByStatus, setFilterOptionByStatus] = useState('all');
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [appliedFilterQuery, setAppliedFilterQuery] = useState('');

  const debounceAppliedQuery = useCallback(
    debounce(setAppliedFilterQuery, 1000),
    [],
  );

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(response => {
        setTodosFromServer(response);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterQuery={filterQuery}
                onFilterQueryChange={setFilterQuery}
                onDebounceAppliedQuery={debounceAppliedQuery}
                filterOption={filterOptionByStatus}
                onFilterOptionChange={setFilterOptionByStatus}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {!isLoading && todosFromServer.length && (
                <TodoList
                  todos={todosFromServer}
                  filterOption={filterOptionByStatus}
                  filterQuery={appliedFilterQuery}
                  onSelectTodo={setSelectedTodo}
                  todoId={selectedTodo && selectedTodo.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onSelectTodo={setSelectedTodo}
        />
      )}
    </>
  );
};

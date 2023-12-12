/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Select } from './types/Select';
import { filterTodos } from './components/helpers/helper';

export const App: React.FC = () => {
  const [todosFromAPI, setTodosFromAPI] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [todoChosen, setTodoChosen] = useState<Todo | null>(null);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodosFromAPI(todos);
      })
      .finally(() => setIsLoading(true));
  }, []);

  const todosToRender: Todo[] = useMemo(
    () => filterTodos(todosFromAPI, query, status as Select), [todosFromAPI, query, status],
  );

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSelect = (givenStatus: string) => {
    setStatus(givenStatus);
  };

  const todoReset = () => {
    setTodoChosen(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onQuery={handleQuery}
                query={query}
                onStatus={handleSelect}
                status={status}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <TodoList
                  todos={todosToRender}
                  onSelectTodo={setTodoChosen}
                  todoSelected={todoChosen}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {todoChosen && (
        <TodoModal
          todo={todoChosen}
          onClose={todoReset}
        />
      )}
    </>
  );
};

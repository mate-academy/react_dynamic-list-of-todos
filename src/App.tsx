/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
// import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState('all');
  const isDataReady = !isLoading;

  useEffect(
    () => {
      setIsLoading(true);

      Promise.all([getTodos()])
        .then((dataFromServer) => {
          const [todosFS] = dataFromServer;

          setTodos(todosFS);
        })
        .finally(() => setIsLoading(false));
    },
    [],
  );

  const todosToRender = useMemo(
    () => {
      return todos.filter(todo => {
        const titleMatches = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
        const statusMatches
          = selectedValue === 'all'
            || (selectedValue === 'completed' ? todo.completed : !todo.completed);

        return titleMatches && statusMatches;
      });
    },
    [todos, searchQuery, selectedValue],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
              />
            </div>

            <div className="block">
              {isLoading && (
                <Loader />
              )}

              {isDataReady && (
                <TodoList
                  todos={todosToRender}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};

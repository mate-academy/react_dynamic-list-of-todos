/* eslint-disable max-len */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { filterTodos, Statuses } from './helpers/filterFunction';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Statuses>(Statuses.All);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    getTodos().then(setTodos);

    if (todos.length > 0) {
      setLoader(true);
    }
  }, [todos.length]);

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, selectedFilter, searchTerm);
  }, [todos, selectedFilter, searchTerm]);

  const onCloseHandler = useCallback(() => {
    setSelectedTodo(null);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
              />
            </div>
            <div className="block">
              {loader ? (
                <TodoList
                  todos={filteredTodos}
                  setSelectedTodo={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={onCloseHandler} />
      )}
    </>
  );
};

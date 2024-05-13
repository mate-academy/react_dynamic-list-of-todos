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
import { Status } from './types/Status';
import { getFilteredTodos } from './utils/getFilteredTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Status>(Status.All);
  const [titles, setTitles] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const modalHandler = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  const filteredTodos = useMemo(
    () => getFilteredTodos(todos, titles, filter),
    [todos, titles, filter],
  );

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (selectedFilter: Status) => {
    setFilter(selectedFilter);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                titles={titles}
                setTitles={setTitles}
                handleFilterChange={handleFilterChange}
              />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && !!todos.length && (
                <TodoList
                  filteredTodos={filteredTodos}
                  modalHandler={modalHandler}
                  selectedTodo={selectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};

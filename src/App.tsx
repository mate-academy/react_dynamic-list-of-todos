/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { getFilterTodos, inputFilterTodos } from './utils/utils';
import { getTodos } from './api';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { FilterEnum } from './enums/EnumFilter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<FilterEnum>(FilterEnum.ALL);
  const [inputFilter, setInputFilter] = useState('');
  const [viewChecker, setViewChecker] = useState(false);

  const filterTodos = getFilterTodos(todos, filter);
  const visibleTodos = inputFilterTodos(filterTodos, inputFilter);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filterChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as FilterEnum);
  };

  const selectTodo = (item: Todo) => {
    setSelectedTodo(item);
  };

  const closeSelectTodo = () => {
    setSelectedTodo(null);
    setViewChecker(false);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={filterChange}
                filter={filter}
                inputFilter={setInputFilter}
                inputFilterValue={inputFilter}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && todos.length > 0 && (
                <TodoList
                  todos={visibleTodos}
                  selectTodo={selectTodo}
                  setViewChecker={setViewChecker}
                  viewChecker={viewChecker}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedtodo={selectedTodo}
          closeSelectTodo={closeSelectTodo}
        />
      )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { SortTodos } from './types/SortTodos';

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);
  const [selectFilter, setSelectFilter] = useState(SortTodos.All);
  const [filterField, setFilterField] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    getTodos().then(setVisibleTodos)
      .catch(() =>  {
        // eslint-disable-next-line
        console.log('Error loading todos')
      })
      .finally(() => setIsLoading(true));
  }, []);

  const filteredTodos = useMemo(() => {
    let filterTodos = [...visibleTodos];

    if (filterField) {
      filterTodos = filterTodos.filter(todo => todo.title.toLowerCase().includes(filterField.toLowerCase().trim()));
    }

    switch (selectFilter) {
      case SortTodos.Active:
        filterTodos = filterTodos.filter(todo => !todo.completed);
        break;

      case SortTodos.Completed:
        filterTodos = filterTodos.filter(todo => todo.completed);
        break;

      default:
        return filterTodos;
    }

    return filterTodos;
  }, [filterField, selectFilter, visibleTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterField={filterField}
                setFilterField={setFilterField}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              {isLoading ? (
                <TodoList
                  selectTodo={selectTodo}
                  visibleTodos={filteredTodos}
                  setIsModalOpen={setIsModalOpen}
                  setSelectTodo={setSelectTodo}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TodoModal
          setSelectTodo={setSelectTodo}
          selectTodo={selectTodo}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

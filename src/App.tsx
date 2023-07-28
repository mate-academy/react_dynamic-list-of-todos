/* eslint-disable max-len */
import React, { useEffect, useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './services/getTodos';
import { Todo } from './types/Todo';
import { FilterSelect } from './types/FilterSelect';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [filterSelect, setFilterSelect] = useState<FilterSelect>(FilterSelect.All);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectTodo, setSelectTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then((data) => {
        setTodos(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getFilteredTodos = useMemo(() => {
    return () => {
      let newTodos = [...todos];

      newTodos = newTodos.filter((todo) => {
        switch (filterSelect) {
          case FilterSelect.Active:
            return !todo.completed;

          case FilterSelect.Completed:
            return todo.completed;

          default:
            return true;
        }
      });

      newTodos = newTodos.filter(({ title }) => title.trim().toLowerCase()
        .includes(filter.trim().toLowerCase()));

      return newTodos;
    };
  }, [todos, filter, filterSelect]);

  const filteredTodos = getFilteredTodos();

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filter={filter}
                setFilter={setFilter}
                filterSelect={filterSelect}
                setFilterSelect={setFilterSelect}
              />
            </div>

            <div className="block">
               {isLoading && todos.length === 0 ? <Loader />
                : (
                <TodoList
                  todos={filteredTodos}
                  selectTodo={selectTodo}
                  setSelectTodo={(todo) => setSelectTodo(todo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectTodo && (
        <TodoModal
          todo={selectTodo}
          setSelectTodo={() => setSelectTodo(null)}
        />
      )}
    </>
  );
};

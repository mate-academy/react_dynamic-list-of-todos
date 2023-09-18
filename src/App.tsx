/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    getTodos().then(todos => setVisibleTodos(todos));
  }, []);

  const filteredTodos = () => {
    let filterTodos = [...visibleTodos];

    if (filterField) {
      filterTodos = filterTodos.filter(todo => todo.title.toLowerCase().includes(filterField.toLowerCase().trim()));
    }

    switch (selectFilter) {
      case SortTodos.Completed:
        filterTodos = filterTodos.filter(todo => !todo.completed);
        break;

      case SortTodos.Active:
        filterTodos = filterTodos.filter(todo => todo.completed);
        break;

      default:
        return filterTodos;
    }

    return filterTodos;
  };

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
                filteredTodos={filteredTodos}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
              />
            </div>

            <div className="block">
              {visibleTodos.length ? (
                <TodoList
                  selectTodo={selectTodo}
                  visibleTodos={filteredTodos()}
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

/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './app.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';

import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { FilterBy } from './Enums/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosLoading, setTodosLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [selectOption, setSelectOption] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    setTodosLoading(true);

    getTodos()
      .then(setTodos)
      .catch((error) => {
        throw new Error(error.code);
      })
      .finally(() => setTodosLoading(false));
  }, []);

  const filteredTodos = useMemo(() => {
    let selectedTodos: Todo[] = [...todos];

    if (filterValue.trim()) {
      selectedTodos = selectedTodos
        .filter(todo => todo.title.toLowerCase().includes(filterValue.toLowerCase()));
    }

    switch (selectOption) {
      case FilterBy.ACTIVE:
        return selectedTodos.filter(todo => !todo.completed);
      case FilterBy.COMPLETED:
        return selectedTodos.filter(todo => todo.completed);
      default:
        return selectedTodos;
    }
  }, [selectOption, filterValue, todos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selectOption={selectOption}
                setSelectOption={setSelectOption}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
              />
            </div>

            <div className="block">
              {todosLoading
                ? <Loader />
                : (
                  <TodoList
                    selectedTodo={selectedTodo}
                    setSelectedTodo={setSelectedTodo}
                    filteredTodos={filteredTodos}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
      {selectedTodo !== null && (
        <TodoModal
          setSelectedTodo={setSelectedTodo}
          selectedTodo={selectedTodo}
        />
      )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useState, useEffect, useMemo } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Select } from './types/SELECT';
import { getTodos } from './api';

const { all, active, completed } = Select;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState(all);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const todoFilter = (): Todo[] | [] => {
    let result;

    switch (selectValue) {
      case completed:
        result = todos?.filter(todo => todo.completed);
        break;

      case active:
        result = todos?.filter(todo => !todo.completed);
        break;

      default:
        result = todos;
    }

    return result ? result.filter(todo => todo.title.replaceAll(' ', '').toLowerCase()
      .includes(searchValue.toLowerCase().trim()))
      : [];
  };

  useEffect(() => {
    getTodos().then((items: Todo[]) => setTodos(items));
  }, []);

  const todoFilterList = useMemo(() => todoFilter(), [searchValue, selectValue, todos.length]);

  const handleChangeSelect = (value: Select) => {
    setSelectValue(value);
  };

  const handleSearchValue = (value: string) => setSearchValue(value);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                handleChangeSelect={handleChangeSelect}
                value={searchValue}
                onSearchValue={handleSearchValue}
              />
            </div>

            <div className="block">
              {!todos.length
                ? <Loader />
                : (
                  <TodoList
                    todos={todoFilterList}
                    setCurrentTodo={setCurrentTodo}
                    currentTodo={currentTodo}
                  />
                ) }
            </div>
          </div>
        </div>
      </div>

      {currentTodo
      && (
        <TodoModal
          currentTodo={currentTodo}
          resetTodo={() => setCurrentTodo(null)}
        />
      )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState('all');
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const todoFilter = (): Todo[] | void => {
    const result = selectValue === 'all'
      ? todos
      : todos?.filter(todo => {
        return selectValue === 'active' ? !todo.completed : todo.completed;
      });

    return result ? result.filter(todo => todo.title.replace(' ', '').toLowerCase()
      .includes(searchValue.toLowerCase().trim()))
      : undefined;
  };

  useEffect(() => {
    getTodos().then((items: Todo[]) => setTodos(items));
  }, []);

  const todoFilterList = todoFilter();
  const onChangeSelect = (value: string) => setSelectValue(value);
  const onChangeSearchValue = (value: string) => setSearchValue(value);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onChangeSelect={onChangeSelect}
                value={searchValue}
                onChangeSearchValue={onChangeSearchValue}
              />
            </div>

            <div className="block">
              {!todoFilterList
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

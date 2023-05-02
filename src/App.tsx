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
import { Select } from './types/Select';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterSelect, setFilterSelect] = useState<Select | string>(Select.all);
  const [inputSelect, setInputSelect] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(setTodoList);
  }, []);

  const filter = () => {
    const filteringArray = todoList && [...todoList].filter(todo => {
      const lowerCase = todo.title.toLowerCase();

      switch (filterSelect) {
        case Select.active:
          return !todo.completed && lowerCase.includes(inputSelect.toLowerCase());
        case Select.completed:
          return todo.completed && lowerCase.includes(inputSelect.toLowerCase());
        default:
          return true && lowerCase.includes(inputSelect.toLowerCase());
      }
    });

    return filteringArray;
  };

  const getFilteringList = useMemo(filter, [todoList, filterSelect, inputSelect]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilterSelect={setFilterSelect}
                setInputSelect={setInputSelect}
                inputSelect={inputSelect}
              />
            </div>

            <div className="block">
              {!todoList ? (
                <Loader />
              ) : (
                <TodoList
                  todos={getFilteringList}
                  setTodoModal={setSelectedTodo}
                  selectedTodo={selectedTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setTodoModal={setSelectedTodo}
        />
      )}
    </>
  );
};

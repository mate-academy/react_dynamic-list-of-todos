/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<number>(0);
  const [hideTodoModal, setHideTodoModal] = useState(false);

  const [selectOption, setSelectOption] = useState('All');
  const [inputValue, setInputValue] = useState('');

  const filterTodo = () => {
    const notCompleted = todos.filter(todo => !todo.completed);
    const completed = todos.filter(todo => todo.completed);

    switch (selectOption) {
      case 'All':
        return !inputValue
          ? todos
          : todos?.filter((todo: Todo) => todo.title.includes(inputValue.toLocaleLowerCase().trim()));

      case 'active':
        return !inputValue
          ? notCompleted
          : notCompleted?.filter((todo: Todo) => todo.title.includes(inputValue.toLocaleLowerCase().trim()));

      case 'completed':
        return !inputValue
          ? completed
          : completed?.filter((todo: Todo) => todo.title.includes(inputValue.toLocaleLowerCase().trim()));

      default:
        return todos;
    }
  };

  const todoFilterList = filterTodo();
  // todos.filter(todo => todo.includes(inputValue.trim()));

  useEffect(() => {
    getTodos()
      .then(todo => setTodos(todo));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectOption={selectOption}
                setSelectOption={setSelectOption}
              />
            </div>

            <div className="block">
              {todos.length === 0
                ? <Loader />
                : (
                  <TodoList
                    todos={todoFilterList}
                    setCurrentTodo={setCurrentTodo}
                    currentTodo={currentTodo}
                    setHideTodoModal={setHideTodoModal}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {hideTodoModal
        && (
          <TodoModal
            setHideTodoModal={setHideTodoModal}
            resetTodo={setCurrentTodo}
            currentTodo={currentTodo}
            todos={todos}
          />
        )}
    </>
  );
};

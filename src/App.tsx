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
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [clickedValue, setClickedValue] = useState(0);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  let copyTodo = todos;

  const filterList = (search: string) => {
    setInputValue(search.toLowerCase());
  };

  if (inputValue.length > 0) {
    copyTodo = todos.filter((todo) => todo.title.toLowerCase()
      .includes(inputValue
        .toLowerCase()));
  }

  if (selectValue.length > 0) {
    switch (selectValue) {
      case 'all':
        setInputValue('');
        setSelectValue('');
        break;
      case 'completed':
        if (inputValue.length === 0) {
          copyTodo = todos.filter((todo) => todo.completed);
        } else {
          copyTodo = todos.filter(
            (todo) => todo.completed
              && todo.title.toLowerCase()
                .includes(inputValue.toLowerCase()),
          );
        }

        break;

      case 'active':
        if (inputValue.length === 0) {
          copyTodo = todos.filter((todo) => !todo.completed);
        } else {
          copyTodo = todos.filter(
            (todo) => !todo.completed
              && todo.title.toLowerCase()
                .includes(inputValue.toLowerCase()),
          );
        }

        break;

      default:
        break;
    }
  }

  const filterlistBySelectElem = (search: string) => {
    setSelectValue(search);
  };

  const getClickedDataFromTable = (value: number) => {
    setClickedValue(value);
  };

  const isModalClosed = (modal: boolean) => {
    setIsModal(modal);
    setClickedValue(0);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterList={filterList}
                filterlistBySelectElem={filterlistBySelectElem}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={copyTodo}
                  getClickedDataFromTable={getClickedDataFromTable}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModal || clickedValue > 0 ? (
        <TodoModal
          todos={todos}
          isModalClosed={isModalClosed}
          clickedValue={clickedValue}
        />
      ) : null}
    </>
  );
};

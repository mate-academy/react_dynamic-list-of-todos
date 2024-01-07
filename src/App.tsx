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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  let filteredTodos = todos;

  const doesTodoTitleIncludeInput = (todo: Todo, input: string) => {
    const lowercaseTitle = todo.title.toLowerCase();
    const lowercaseInput = input.toLowerCase();

    return lowercaseTitle.includes(lowercaseInput);
  };

  const handleFilterList = (search: string) => {
    setInputValue(search.toLowerCase());
  };

  if (inputValue.length) {
    filteredTodos
    = todos
        .filter((todo) => doesTodoTitleIncludeInput(todo, inputValue));
  }

  if (selectValue.length > 0) {
    switch (selectValue) {
      case 'all':
        setInputValue('');
        setSelectValue('');
        break;
      case 'completed':
        if (!inputValue.length) {
          filteredTodos = todos.filter((todo) => todo.completed);
        } else {
          filteredTodos
          = todos
              .filter((todo) => todo.completed
              && doesTodoTitleIncludeInput(todo, inputValue));
        }

        break;

      case 'active':
        if (!inputValue.length) {
          filteredTodos = todos.filter((todo) => !todo.completed);
        } else {
          filteredTodos
           = todos.filter((todo) => !todo.completed
           && doesTodoTitleIncludeInput(todo, inputValue));
        }

        break;

      default:
        break;
    }
  }

  const handleFilterBySelectElem = (search: string) => {
    setSelectValue(search);
  };

  const handleGetClickedDataFromTable = (value: number) => {
    setClickedValue(value);
  };

  const handleCloseModal = (modal: boolean) => {
    setIsModalOpen(modal);
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
                filterList={handleFilterList}
                filterlistBySelectElem={handleFilterBySelectElem}
              />
            </div>

            <div className="block">
              {!todos.length ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  getClickedDataFromTable={handleGetClickedDataFromTable}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen || clickedValue ? (
        <TodoModal
          todos={todos}
          isModalClosed={handleCloseModal}
          clickedValue={clickedValue}
        />
      ) : null}
    </>
  );
};

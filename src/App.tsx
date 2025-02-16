/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos } from './api';
import { ButtonContextProvider } from './context/ButtonContext';
import { TodoContextProvider } from './context/TodoContext';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [copyTodoList, setCopyTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(todo => {
      setTodoList(todo);
      setCopyTodoList(todo);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter setFilteredList={setTodoList} list={copyTodoList} />
            </div>

            <ButtonContextProvider>
              <TodoContextProvider>
                <div className="block">
                  {copyTodoList.length === 0 ? (
                    <Loader />
                  ) : (
                    <TodoList todoList={todoList} />
                  )}
                </div>
                <TodoModal />
              </TodoContextProvider>
            </ButtonContextProvider>
          </div>
        </div>
      </div>
    </>
  );
};

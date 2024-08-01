/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todosFromServer, SetTodosFromServer] = useState<Todo[]>([])
  const [loaderBool, SetLoaderBool] = useState(true)

  const [selectOption, setSelectOption] = useState('All');

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getTodos().then(data => {
      SetTodosFromServer(data)
      SetLoaderBool(false);
    })
  }, [])

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            {selectOption}

            <div className="block">
              <TodoFilter setSelectOption={setSelectOption} setInputText={setInputText} inputText={inputText} />
            </div>

            <div className="block">
              {loaderBool && (
                <Loader />
              )}
              {todosFromServer.length > 0 &&
                <TodoList todos={todosFromServer} selectOption={selectOption}
              />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

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
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [loaderBool, setLoaderBool] = useState(true);

  const [selectedOption, setSelectedOption] = useState('All');

  const [inputText, setInputText] = useState('');

  useEffect(() => {
    getTodos().then(data => {
      setTodosFromServer(data);
      setLoaderBool(false);
    });
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSelectOption={setSelectedOption}
                setInputText={setInputText}
                inputText={inputText}
              />
            </div>

            <div className="block">
              {loaderBool && <Loader />}
              {todosFromServer.length > 0 && (
                <TodoList
                  todos={todosFromServer}
                  selectOption={selectedOption}
                  inputText={inputText}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

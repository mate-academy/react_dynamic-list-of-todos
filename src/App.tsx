/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { getTodos } from './api';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [option, setOption] = useState('All');
  const [inputValue, setInputValue] = useState('');
  const [selectEye, setSelectEye] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(todos => setTodosFromServer(todos))
      .finally(() => setLoading(false));
  }, []);

  const filteredTodos = todosFromServer.filter(todo => {
    const titleOfMatches = todo.title
      .toLowerCase()
      .includes(inputValue.toLowerCase());
    const statusSearch = (() => {
      switch (option) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    })();

    return titleOfMatches && statusSearch;
  });

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
                option={option}
                setOption={setOption}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && (
                <TodoList
                  todos={filteredTodos}
                  selectEye={selectEye}
                  setSelectEye={setSelectEye}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectEye && (
        <TodoModal selectEye={selectEye} setSelectEye={setSelectEye} />
      )}
    </>
  );
};

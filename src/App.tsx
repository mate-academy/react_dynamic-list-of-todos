/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [list, setList] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>(0);
  const [todoIsClicked, setTodoIsClicked] = useState(false);
  const [listModified, setListModified] = useState(list);

  const todoButtonStatus = () => {
    setTodoIsClicked(false);
  };

  const listChanging = (changedList: Todo[] | []) => {
    setListModified(changedList);
  };

  const setUserId = (todoId: number) => {
    setSelectedTodoId(todoId);
    setTodoIsClicked(true);
  };

  useEffect(() => {
    getTodos()
      .then(api => {
        setList(api);
        setListModified(api);
      });
  }, []);

  const todo = list.find(item => item.id === selectedTodoId);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                list={list}
                handleChanges={listChanging}
              />
            </div>

            <div className="block">
              {list.length > 0
                ? (
                  <TodoList
                    list={listModified}
                    handleButton={setUserId}
                    isClicked={todoIsClicked}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {todoIsClicked && (
        <TodoModal
          handleClick={todoButtonStatus}
          todo={todo}
        />
      )}
    </>
  );
};

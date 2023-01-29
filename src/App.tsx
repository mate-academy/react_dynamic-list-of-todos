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
  const [isTodoClicked, setIsTodoClicked] = useState(false);
  const [listModified, setListModified] = useState(list);

  const handleButtonCross = () => {
    setIsTodoClicked(false);
  };

  const handleListChanging = (changedList: Todo[] | []) => {
    setListModified(changedList);
  };

  const handleButtonClick = (todoId: number) => {
    setSelectedTodoId(todoId);
    setIsTodoClicked(true);
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
                onListChanging={handleListChanging}
              />
            </div>

            <div className="block">
              {list.length > 0
                ? (
                  <TodoList
                    list={listModified}
                    onButtonClick={handleButtonClick}
                    isClicked={isTodoClicked}
                  />
                )
                : <Loader />}
            </div>
          </div>
        </div>
      </div>

      {isTodoClicked && (
        <TodoModal
          onButtonCross={handleButtonCross}
          todo={todo}
        />
      )}
    </>
  );
};

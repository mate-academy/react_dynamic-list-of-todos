import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoUser } from './types/User';
import { SortTypes } from './types/SortType';

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [sourceData, setSourceData] = useState<Todo[]>([]);
  const [sortTypeForTodos, setSortTypeForTodos] = useState<SortTypes | string>(
    SortTypes.ALL,
  );
  const [userInfoForModal, setUserInfoForModal] = useState<TodoUser | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [selectButtonMark, setSelectButtonMark] = useState<number>(-1);
  const sortTodos = () => {
    if (loaded) {
      switch (sortTypeForTodos) {
        case SortTypes.ACTIVE:
          return sourceData.filter((todo) => !todo.completed);
        case SortTypes.COMPLETED:
          return sourceData.filter((todo) => todo.completed);
        case SortTypes.ALL:
          return sourceData;
        default:
          return sourceData.filter((todo) => todo.title
            .includes(sortTypeForTodos));
      }
    }

    return [];
  };

  const todos = sortTodos();

  useEffect(() => {
    getTodos().then((list) => {
      setSourceData(list);
      setLoaded(true);
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
                sortType={setSortTypeForTodos}
                sortValue={sortTypeForTodos}
              />
            </div>

            <div className="block">
              {loaded ? (
                <TodoList
                  todoList={todos}
                  setUserInfoForModal={setUserInfoForModal}
                  setShowModal={setShowModal}
                  selectButtonMark={selectButtonMark}
                  setSelectButtonMark={setSelectButtonMark}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          user={userInfoForModal as TodoUser}
          setSelectButtonMark={setSelectButtonMark}
          setUserInfoForModal={setUserInfoForModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

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

type FilterParams = {
  category: string;
  input: string;
};

type UserInfo = {
  userId: number;
  todo: Todo;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(true);
  const [userinfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getTodos().then(todosItems => {
      setLoader(false);
      setTodos(todosItems);
    });
  }, []);

  const filterTodos = ({ category, input }: FilterParams) => {
    getTodos().then(items => {
      const inputCase = input.toLocaleLowerCase();

      if (!category || category === 'all') {
        setTodos(
          items.filter(todo =>
            todo.title.toLocaleLowerCase().includes(inputCase),
          ),
        );
      }

      if (category === 'active') {
        setTodos(
          items.filter(
            todo =>
              todo.completed === false &&
              todo.title.toLocaleLowerCase().includes(inputCase),
          ),
        );
      }

      if (category === 'completed') {
        setTodos(
          items.filter(
            todo =>
              todo.completed === true &&
              todo.title.toLocaleLowerCase().includes(inputCase),
          ),
        );
      }
    });
  };

  const getUserById = (userId: number, todo: Todo) => {
    setUserInfo({
      userId,
      todo,
    });
  };

  const reset = () => {
    setUserInfo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFiltersChange={filterTodos} />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList
                  todos={todos}
                  getUserId={getUserById}
                  setHide={setIsHidden}
                  isHidden={isHidden}
                  currentUser={userinfo?.todo.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {userinfo && <TodoModal userInfo={userinfo} reset={reset} />}
    </>
  );
};

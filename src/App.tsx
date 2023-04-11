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

export const App: React.FC = () => {
  const [arrOfTodos, setTodos] = useState<Todo[]>([]);
  const [sortParam, setSortParam] = useState({
    sortSelect: '',
    sortInput: '',
  });
  const [userId, setUserId] = useState(0);
  const [todoId, setTodoId] = useState(0);

  const setFilterParam = (select: string, input: string) => {
    setSortParam({
      sortSelect: select,
      sortInput: input,
    });
  };

  const changeUserId = (id: number) => {
    setUserId(id);
  };

  const changeTodoId = (id: number) => {
    setTodoId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const arrayTodosFromServer = await getTodos();

      setTodos(arrayTodosFromServer);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={setFilterParam} />
            </div>

            <div className="block">
              {arrOfTodos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={arrOfTodos}
                  filter={sortParam}
                  selectUser={changeUserId}
                  selectTodo={changeTodoId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {userId !== 0 && <TodoModal userId={userId} todos={arrOfTodos} selectUser={changeUserId} currentTodo={todoId} />}
    </>
  );
};

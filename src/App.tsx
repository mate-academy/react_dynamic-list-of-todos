/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState([...todos]);
  const [userId, setUserId] = useState(0);

  const getTodosFromServer = async () => {
    const loadedTodos = await getTodos();

    setTodos(loadedTodos);
    setVisibleTodos(loadedTodos);
  };

  const showTodo = (userNum: number) => {
    setUserId(userNum);
  };

  const stopShowTodo = () => {
    setUserId(0);
  };

  const filterTodo = (filterBy: string, searchBy: string) => {
    switch (filterBy) {
      case 'active':
        setVisibleTodos(todos.filter(visibleGood => !visibleGood.completed
          && visibleGood.title.toLowerCase()
            .includes(searchBy.toLowerCase())));
        break;
      case 'completed':
        setVisibleTodos(todos.filter(visibleGood => visibleGood.completed
          && visibleGood.title.toLowerCase()
            .includes(searchBy.toLowerCase())));
        break;
      case 'all':
        setVisibleTodos(todos.filter(visibleGood => visibleGood.title.toLowerCase()
          .includes(searchBy.toLowerCase())));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onFilter={filterTodo} />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={visibleTodos}
                  onShow={showTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {userId !== 0 && (
        <TodoModal
          todos={todos}
          userId={userId}
          stopShow={stopShowTodo}
        />
      )}
    </>
  );
};

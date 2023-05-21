/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { SortEnum } from './types/sort';

export const App: React.FC = () => {
  const [select, setSelect] = useState(SortEnum.ALL);
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User>();
  const [userId, setUserId] = useState(0);
  const [todo, setTodo] = useState<Todo>();

  useEffect(() => {
    getTodos().then(itemTodos => setTodos(itemTodos));
    getUser(userId).then(userApi => setUser(userApi));
  }, [userId]);

  const funcTodoFilter = (arr:Todo[], selectFilter:string, textFilter:string) => {
    const items = [...arr];
    const selectItems = items.filter(item => {
      switch (selectFilter) {
        case SortEnum.ALL:
          return item;

        case SortEnum.ACTIVE:
          return item.completed === false;

        case SortEnum.COMPLETED:
          return item.completed === true;

        default:
          return item;
      }
    });

    return selectItems.filter(item => item.title.includes(textFilter));
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={select}
                setSelect={setSelect}
                search={search}
                setSearch={setSearch}
              />
            </div>

            <div className="block">
              {todos.length === 0 ? (
                <Loader />
              ) : (
                <TodoList
                  todos={funcTodoFilter(todos, select, search)}
                  userId={userId}
                  setUserId={setUserId}
                  setTodo={setTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {userId > 0 && (
        <TodoModal
          user={user}
          todo={todo}
          setUserId={setUserId}
          setTodo={setTodo}
        />
      )}
    </>
  );
};

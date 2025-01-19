/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';
import { ToDoInfo } from './types/toDoInfo';
import { TodoModal } from './components/TodoModal';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [loadModal, setLoadModal] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<ToDoInfo>({
    userId: 0,
    title: '',
    complete: false,
    taskId: 0,
  });
  const [user, setUser] = useState<User & ToDoInfo>();
  const [visability, setvisability] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<string>('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const handleVisability = (id: number) => {
    setvisability(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 300);
    getTodos().then((response: Todo[]) => {
      setTodos(response);
      setFilteredTodos(response);
    });
  }, []);

  useEffect(() => {
    if (userInfo.userId) {
      setTimeout(() => {
        setLoadModal(false);
      }, 300);
      getUser(userInfo.userId).then((response: User) =>
        setUser({ ...response, ...userInfo }),
      );
    } else {
      setUser(undefined);
    }
  }, [userInfo]);

  useEffect(() => {
    switch (filter) {
      case 'completed':
        setTodos(filteredTodos.filter((item: Todo) => item.completed));
        break;
      case 'active':
        setTodos(filteredTodos.filter((item: Todo) => !item.completed));
        break;
      case 'all':
        setTodos(filteredTodos);
    }
  }, [filter, filteredTodos]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setSwitch={setFilter}
                setTodos={setTodos}
                filteredTodos={filteredTodos}
                filter={filter}
              />
            </div>

            <div className="block">
              {load && <Loader />}
              {!load && (
                <TodoList
                  todos={todos}
                  setUserId={(
                    userId: number,
                    title: string,
                    complete: boolean,
                    taskId: number,
                  ) => {
                    setUserInfo({
                      userId: userId,
                      title: title,
                      complete: complete,
                      taskId: taskId,
                    });
                  }}
                  handleVisability={handleVisability}
                  visability={visability}
                />
              )}

              {userInfo.taskId && (
                <TodoModal
                  loadModal={loadModal}
                  user={user}
                  setUserInfo={(
                    userId: number,
                    title: string,
                    complete: boolean,
                    taskId: number,
                  ) =>
                    setUserInfo({
                      userId: userId,
                      title: title,
                      complete: complete,
                      taskId: taskId,
                    })
                  }
                  setModalLoad={setLoadModal}
                  handleVisability={handleVisability}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

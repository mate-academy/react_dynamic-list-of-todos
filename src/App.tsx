import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { check, getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoUser } from './types/User';

export const App: React.FC = () => {
  const [sourceData, setSourceData] = useState<Todo[] | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [sortBy, setSortBy] = useState('all');
  const [userModal, setUserModal] = useState<TodoUser | null>(null);
  const [eyeMark, setEyeMark] = useState<number>(-1);

  const preRender = () => {
    if (sourceData) {
      switch (sortBy) {
        case 'active':
          setTodos(sourceData.filter(todo => !todo.completed));
          break;

        case 'completed':
          setTodos(sourceData.filter(todo => todo.completed));
          break;

        case 'all':
          setTodos(sourceData);
          break;

        default:
          setTodos(sourceData.filter(todo => todo.title.includes(sortBy)));
          break;
      }
    }
  };

  useEffect(() => {
    getTodos().then(list => {
      setSourceData(list);
      setTodos(list);
    });
  }, []);

  useEffect(() => {
    preRender();
  }, [sortBy]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                sortType={setSortBy}
                sortValue={sortBy}
              />
            </div>

            <div className="block">
              {(!todos)
                ? (<Loader />)
                : (
                  <TodoList
                    todoList={todos !== null ? todos : []}
                    setUserModal={setUserModal}
                    eyeMark={eyeMark}
                    setEyeMark={setEyeMark}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {check(userModal)
        && (
          <TodoModal
            user={userModal as TodoUser}
            setEyeMark={setEyeMark}
            setUserModal={setUserModal}
          />
        )}
    </>
  );
};

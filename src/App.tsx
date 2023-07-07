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

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [sourceData, setSourceData] = useState<Todo[]>([]);
  const [sortBy, setSortBy] = useState('all');
  const [userModal, setUserModal] = useState<TodoUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [eyeMark, setEyeMark] = useState<number>(-1);
  const sortTodos = () => {
    if (loaded) {
      switch (sortBy) {
        case 'active':
          return sourceData.filter((todo) => !todo.completed);
        case 'completed':
          return sourceData.filter((todo) => todo.completed);
        case 'all':
          return sourceData;
        default:
          return sourceData.filter((todo) => todo.title.includes(sortBy));
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
              <TodoFilter sortType={setSortBy} sortValue={sortBy} />
            </div>

            <div className="block">
              {loaded ? (
                <TodoList
                  todoList={todos !== null ? todos : []}
                  setUserModal={setUserModal}
                  setShowModal={setShowModal}
                  eyeMark={eyeMark}
                  setEyeMark={setEyeMark}
                />
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {check(userModal) && ( */}
      {showModal && (
        <TodoModal
          user={userModal as TodoUser}
          setEyeMark={setEyeMark}
          setUserModal={setUserModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

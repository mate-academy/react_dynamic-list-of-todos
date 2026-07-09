/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

enum FilterType {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [chouseUser, setChouseUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });

  const [filter, setFilter] = useState<FilterType>(FilterType.all);
  const [querry, setQuerry] = useState('');

  const [loader, setLoader] = useState(true);

  const [userId, setUserId] = useState(0);

  useEffect(() => {
    getTodos().then(todo => {
      setTodos(todo);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    getUser(userId).then(user => {
      setChouseUser(user);
    });
  }, [userId]);

  const visibleTodos = todos
    .filter(item => {
      switch (filter) {
        case FilterType.active:
          return !item.completed;
        case FilterType.completed:
          return item.completed;
        case FilterType.all:
        default:
          return true;
      }
    })
    .filter(newItem => {
      return newItem.title.toLowerCase().includes(querry.toLowerCase());
    });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                onFilterValue={itemFromFilter => {
                  setFilter(itemFromFilter as FilterType);
                }}
                onQuerryValue={querryFromFilter => setQuerry(querryFromFilter)}
              />
            </div>

            <div className="block">
              {loader ? (
                <Loader />
              ) : (
                <TodoList todos={visibleTodos} onModal={setUserId} />
              )}
            </div>
          </div>
        </div>
      </div>
      {userId && <TodoModal user={chouseUser} />}
    </>
  );
};

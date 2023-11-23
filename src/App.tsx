/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<FilterStatus>(FilterStatus.All);
  const [todoInfo, setTodoInfo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setLoader(true);
    getTodos().then(data => {
      setTodos(data);
    })
      .catch(() => setTodos([]))
      .finally(() => setLoader(false));
  }, []);

  useEffect(() => {
    if (todoInfo) {
      setLoader(true);
      getUser(todoInfo.userId)
        .then(setUser)
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
        })
        .finally(() => setLoader(false));
    }
  }, [todoInfo]);

  const filteredTodos = useMemo(() => {
    let result = [...todos];

    switch (status) {
      case FilterStatus.Active:
        result = result.filter(todo => !todo.completed);
        break;

      case FilterStatus.Completed:
        result = result.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    if (query.trim().length > 0) {
      result = result.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return result;
  }, [todos, query, status]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                query={query}
                queryFilter={setQuery}
                status={status}
                statusFilter={setStatus}
              />
            </div>

            <div className="block">
              {loader && !todoInfo
                ? <Loader />
                : (
                  <TodoList
                    todos={filteredTodos}
                    todoInfo={todoInfo}
                    selectTodo={setTodoInfo}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {todoInfo && (
        <TodoModal
          loader={loader}
          todo={todoInfo}
          user={user}
          closeModal={setTodoInfo}
        />
      )}
    </>
  );
};

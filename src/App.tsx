import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { User } from './types/User';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(Status.all);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                status={status}
                setStatus={setStatus}
                setQuery={setQuery}
                query={query}
              />
            </div>

            <div className="block">
              {loading && (
                <Loader />
              )}
              {!loading && (
                <TodoList
                  todos={todos}
                  setIsModal={setIsModal}
                  setUserId={setUserId}
                  setCurrentTodo={setCurrentTodo}
                  status={status}
                  query={query}
                  isModal={isModal}
                  currentTodo={currentTodo}
                />
              )}

            </div>
          </div>
        </div>
      </div>

      {isModal && currentTodo && (
        <TodoModal
          user={user}
          currentTodo={currentTodo}
          setIsModal={setIsModal}
          userId={userId}
          setUser={setUser}
        />
      )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filter, setFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState(Status.All);
  const [selectedPost, setSelectedPost] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  const preparedTodos = useMemo(
    () =>
      (todos || [])
        .filter(todo => {
          switch (groupFilter) {
            case Status.Active:
              return !todo.completed;
            case Status.Completed:
              return todo.completed;
            default:
              return true;
          }
        })
        .filter(todo =>
          todo.title.toLowerCase().includes(filter.toLowerCase().trim()),
        ),
    [todos, filter, groupFilter],
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setFilter={setFilter}
                setGroupFilter={setGroupFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && preparedTodos && (
                <TodoList
                  todos={preparedTodos}
                  setSelectedPost={setSelectedPost}
                  selectedPostId={selectedPost?.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedPost && (
        <TodoModal
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
    </>
  );
};

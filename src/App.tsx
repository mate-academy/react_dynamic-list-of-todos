/* eslint-disable max-len */
import './App.scss';

import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [groupFilter, setGroupFilter] = useState('');
  const [filter, setFilter] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos
      .filter(todo => {
        switch (groupFilter) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      })
      .filter(todo => todo.title.toLowerCase().includes(filter.toLowerCase()));
  }, [groupFilter, todos, filter]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setGroupFilter={setGroupFilter}
                setFilter={setFilter}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                setSelectedPost={setSelectedPost}
                selectedPostId={selectedPost?.id}
              />
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

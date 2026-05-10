/* eslint-disable max-len */
import React, { useEffect, useState, useCallback } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';

import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();
  const [post, setPost] = useState<Todo | null>(null);

  useEffect(() => {
    getTodos().then(data => {
      setTodos(data);
      setVisibleTodos(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!post) {
      return;
    }

    setIsLoadingUser(true);

    getUser(post.userId)
      .then(setUser)
      .finally(() => setIsLoadingUser(false));
  }, [post]);
  const addPost = (targetPost: Todo) => {
    setUser(undefined);
    setPost(targetPost);
  };

  const resetPost = (targetPost: Todo | null) => {
    setPost(targetPost);
  };

  const filterTodo = useCallback((newFilterTodo: Todo[]) => {
    setVisibleTodos(newFilterTodo);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter todos={todos} onFilter={filterTodo} />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList
                todos={visibleTodos}
                selectedTodo={post}
                onSubmit={addPost}
              />
            </div>
          </div>
        </div>
      </div>

      {post && (
        <TodoModal
          post={post}
          user={user}
          isLoading={isLoadingUser}
          onClose={resetPost}
        />
      )}
    </>
  );
};

/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { Options } from './types/Options';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [selectOption, setSelectOption] = useState<Options>(Options.All);
  const [selectPost, setSelectPost] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filterTodos = () => {
    const todoFilter = todos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    switch (selectOption) {
      case Options.Active:
        return todoFilter.filter(todo => !todo.completed);

      case Options.Completed:
        return todoFilter.filter(todo => todo.completed);
    }

    return todoFilter;
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                select={selectOption}
                query={query}
                setQuery={setQuery}
                setSelect={setSelectOption}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!!todos.length && (
                <TodoList
                  posts={filterTodos()}
                  postId={selectPost?.id}
                  setSelectPost={postTodo => setSelectPost(postTodo)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectPost && <TodoModal closePost={setSelectPost} post={selectPost} />}
    </>
  );
};

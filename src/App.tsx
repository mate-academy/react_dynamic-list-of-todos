/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
// import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [hasSelectedTodo, setHasSelectedTodo] = useState(false);
  const [loaderIsShown, setLoaderIsShown] = useState(true);

  // const currentUser = getUser(selectedTodo?.userId);

  // const [currentUser, setCurrentUser] = useState<User | null>(null);

  setTimeout(() => {
    setLoaderIsShown(false);
  }, 300);

  useEffect(() => {
    getTodos().then(setTodos);
  }, [todos]);

  const handleClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setHasSelectedTodo(true);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loaderIsShown && (
                <Loader />
              )}
              <TodoList
                todos={todos}
                selectedId={selectedTodo?.id}
                handleClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>

      {hasSelectedTodo && (
        <TodoModal />
      )}
    </>
  );
};

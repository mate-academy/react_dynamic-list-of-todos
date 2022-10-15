/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingTodo, setIsLoadingTodo] = useState(true);
  const [isOpenTodo, setIsOpenTodo] = useState(0);
  const [qwery, setQwery] = useState('');
  const [category, setCategory] = useState('all');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then((loadedTodos) => {
      setTodos(loadedTodos);
      setIsLoadingTodo(false);
    });
  }, []);

  const onOpenTodo = (todoId: number) => {
    setIsOpenTodo(todoId);
    setIsLoadingUser(true);
  };

  const filterTodos = () => {
    const byQwery = todos.filter(todo => {
      const title = todo.title.toLowerCase();

      return title.match(qwery.toLowerCase());
    });

    if (category === 'completed') {
      return byQwery.filter(todo => (todo.completed));
    }

    if (category === 'active') {
      return byQwery.filter(todo => (!todo.completed));
    }

    return byQwery;
  };

  const getTodo = (todoId: number) => {
    return todos.find(todo => todo.id === todoId) || todos[0];
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setCategory={setCategory}
                setQwery={setQwery}
                qwery={qwery}
              />
            </div>

            <div className="block">
              {isLoadingTodo ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filterTodos()}
                  onOpen={onOpenTodo}
                  opened={isOpenTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {isOpenTodo && (
        <TodoModal
          isLoading={isLoadingUser}
          setIsLoadingUser={setIsLoadingUser}
          onClose={setIsOpenTodo}
          currentTodo={getTodo(isOpenTodo)}
        />
      )}

    </>
  );
};

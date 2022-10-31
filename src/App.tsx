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
import { Category } from './types/Category';

export const App: React.FC = () => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingTodo, setIsLoadingTodo] = useState(true);
  const [isOpenTodo, setIsOpenTodo] = useState(0);
  const [qwery, setQwery] = useState('');
  const [category, setCategory] = useState<Category>(Category.ALL);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadTodosFromApi = async () => {
      try {
        const response = await getTodos();

        setTodos(response);
      } catch (e) {
        throw new Error('Error on loading todos');
      }

      setIsLoadingTodo(false);
    };

    loadTodosFromApi();
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

    if (category === Category.COMPLETED) {
      return byQwery.filter(todo => (todo.completed));
    }

    if (category === Category.ACTIVE) {
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

      {isOpenTodo !== 0 && (
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

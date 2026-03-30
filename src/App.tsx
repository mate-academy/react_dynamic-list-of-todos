/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import * as apiMetodos from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';
// import { todo } from 'node:test';
// import { todo } from 'node:test';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [loader, isLoader] = useState(false);
  const [originalTodo, setOrinalTodo] = useState<Todo[]>([]);
  const [numberSet, setNumber] = useState(0);
  const [todoComment, setTodoComment] = useState('');
  const [completed, setCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    setTimeout(() => {
      isLoader(true);
      apiMetodos.getTodos().then(r => {
        setTodos(r);
        setOrinalTodo(r);
      });
    }, 1000);
  }, []);

  const seeComent = (todo: Todo) => {
    const newArrTodo = todos.map(item => {
      if (item.id === todo.id) {
        return {
          id: todo.id,
          title: todo.title,
          completed: true,
          userId: todo.userId,
        };
      }

      return item;
    });
    const newArrOriginal = originalTodo.map(item => {
      if (item.id === todo.id) {
        return {
          id: todo.id,
          title: todo.title,
          completed: true,
          userId: todo.userId,
        };
      }

      return item;
    });

    setTodos(newArrTodo);
    setOrinalTodo(newArrOriginal);
  };

  const onShow = (
    userNumber: number,
    comment: string,
    completedTrue: boolean,
    todo: Todo | null,
  ) => {
    apiMetodos.getUser(userNumber).then(r => {
      setUsers(r);
    });
    setCompleted(completedTrue);
    setTodoComment(comment);
    setNumber(userNumber);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    if (todo !== null && !todo.completed) {
      const updatedTodo = {
        ...todo,
        completed: true,
      };

      seeComent(updatedTodo);
    }
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>
            <div className="block">
              <TodoFilter todo={originalTodo} setTodo={setTodos} />
            </div>

            <div className="block">
              {!loader && <Loader />}
              {loader && <TodoList todo={todos} onShow={onShow} />}
            </div>
          </div>
        </div>
      </div>

      {numberSet !== 0 && (
        <TodoModal
          user={users}
          isLoading={isLoading}
          onShow={onShow}
          todoComment={todoComment}
          completed={completed}
        />
      )}
    </>
  );
};

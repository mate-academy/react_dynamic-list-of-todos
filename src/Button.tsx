import React from 'react';
import { TodoProps, UserProps, PreparedProps } from './interfaces';
import { getTodos, getUsers } from './api';

interface ButtonProps {
  beforeLoaded: () => void;
  afterLoaded: (list: PreparedProps[]) => void;
}

export const Button: React.FC<ButtonProps> = ({ beforeLoaded, afterLoaded }) => {
  const getTodoList = async () => {
    beforeLoaded();

    const todos: TodoProps[] = await getTodos();
    const users: UserProps[] = await getUsers();

    function findUserById(id: number) {
      return users.find(user => user.id === id)?.name;
    }

    const list: PreparedProps[] = todos.map(todo => {
      return {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        user: findUserById(todo.userId),
      };
    });

    afterLoaded(list);
  };

  return (
    <button
      type="button"
      className="btn btn-dark ml shadow p-3 mb-5  rounded"
      onClick={getTodoList}
    >
      <i className="material-icons left" />
      Load todos
    </button>
  );
};

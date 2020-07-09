import React from 'react';
import { todoType, userType, preparedType } from './interfaces';
import { getData, URLTodos, URLUsers } from './api';

type ButtonType = {
  beforeLoaded: () => void;
  afterLoaded: (list: preparedType[]) => void;
};

export const Button: React.FC<ButtonType> = ({ beforeLoaded, afterLoaded }) => {
  const getTodoList = async () => {
    beforeLoaded();

    const todos = await getData<todoType>(URLTodos);
    const users = await getData<userType>(URLUsers);

    function findUserById(id: number) {
      return users.find(user => user.id === id)?.name;
    }

    const list: preparedType[] = todos.map(todo => {
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
